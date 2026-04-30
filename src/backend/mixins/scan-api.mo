import List "mo:core/List";
import Array "mo:core/Array";
import Error "mo:core/Error";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import ScanLib "../lib/scan";
import InferenceLib "../lib/inference";
import PatientLib "../lib/patient";
import ScanTypes "../types/scan";
import PatientTypes "../types/patient";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  scans : List.List<ScanTypes.ScanRecord>,
  patients : List.List<PatientTypes.Patient>,
  transform : OutCall.Transform,
) {
  var nextScanId : Nat = 1;

  /// Upload a fundus image and create a pending scan record for the caller.
  /// Returns #err if no patient profile exists — never traps.
  public shared ({ caller }) func createScan(input : ScanTypes.CreateScanInput) : async Common.Result<ScanTypes.ScanRecord, Text> {
    let patient = switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case (?p) { p };
      case null { return #err("Patient profile not found. Please create your profile first.") };
    };
    let record = ScanLib.createScan(scans, nextScanId, patient.id, input);
    nextScanId += 1;
    #ok(record);
  };

  /// Run AI classification on an existing scan owned by the caller.
  /// Wraps inference in error propagation — never hangs or traps.
  public shared ({ caller }) func classifyScan(scanId : Common.ScanId) : async Common.Result<ScanTypes.ScanRecord, Text> {
    let patient = switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case (?p) { p };
      case null { return #err("Patient profile not found") };
    };
    let scan = switch (ScanLib.getScan(scans, scanId)) {
      case (?s) { s };
      case null { return #err("Scan not found") };
    };
    if (scan.patientId != patient.id) {
      return #err("Access denied");
    };
    let inferenceResult = try {
      await InferenceLib.analyzeImage(scan.imageId, transform);
    } catch (e) {
      return #err("Classification failed: " # e.message());
    };
    switch (inferenceResult) {
      case (#err(e)) { #err("Classification failed: " # e) };
      case (#ok(result)) {
        switch (ScanLib.attachResult(scans, scanId, result)) {
          case (#ok(updated)) { #ok(updated) };
          case (#err(e)) { #err(e) };
        };
      };
    };
  };

  /// Retrieve a single scan record — only accessible to the owning patient.
  public query ({ caller }) func getScan(scanId : Common.ScanId) : async ?ScanTypes.ScanRecord {
    let patient = switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case (?p) { p };
      case null { return null };
    };
    switch (ScanLib.getScan(scans, scanId)) {
      case (?s) {
        if (s.patientId == patient.id) { ?s } else { null };
      };
      case null { null };
    };
  };

  /// List all scan records for the calling patient, sorted newest-first.
  /// Uses Array.sort — O(n log n), no timeout risk with large lists.
  public query ({ caller }) func getMyScans() : async [ScanTypes.ScanRecord] {
    switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case null { [] };
      case (?patient) {
        let patientScans = ScanLib.getPatientScans(scans, patient.id);
        // Sort descending by uploadedAt using Array.sort (O(n log n))
        patientScans.sort(func(a : ScanTypes.ScanRecord, b : ScanTypes.ScanRecord) : Order.Order {
          Int.compare(b.uploadedAt, a.uploadedAt);
        });
      };
    };
  };

  /// Generate (or return existing) a view-only share token for a scan owned by the caller.
  public shared ({ caller }) func generateShareToken(scanId : Common.ScanId) : async Common.Result<Text, Text> {
    let patient = switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case (?p) { p };
      case null { return #err("Patient profile not found") };
    };
    let scan = switch (ScanLib.getScan(scans, scanId)) {
      case (?s) { s };
      case null { return #err("Scan not found") };
    };
    if (scan.patientId != patient.id) {
      return #err("Access denied");
    };
    switch (scan.shareToken) {
      case (?token) { #ok(token) };
      case null {
        let ts = Int.abs(Time.now());
        let token = scanId.toText() # "-" # ts.toText();
        switch (ScanLib.generateShareToken(scans, scanId, token)) {
          case (?_) { #ok(token) };
          case null { #err("Failed to generate token") };
        };
      };
    };
  };

  /// Public: retrieve a shared scan result by token — no authentication required.
  public query func getSharedScan(token : Text) : async ?ScanTypes.SharedScanView {
    ScanLib.getSharedScan(scans, token);
  };
};
