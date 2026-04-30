import List "mo:core/List";
import Time "mo:core/Time";
import ScanTypes "../types/scan";
import Common "../types/common";

module {
  public func createScan(
    scans : List.List<ScanTypes.ScanRecord>,
    nextId : Nat,
    patientId : Common.PatientId,
    input : ScanTypes.CreateScanInput,
  ) : ScanTypes.ScanRecord {
    let record : ScanTypes.ScanRecord = {
      id = nextId;
      patientId;
      imageId = input.imageId;
      uploadedAt = Time.now();
      result = null;
      shareToken = null;
    };
    scans.add(record);
    record;
  };

  public func getScan(
    scans : List.List<ScanTypes.ScanRecord>,
    id : Common.ScanId,
  ) : ?ScanTypes.ScanRecord {
    scans.find(func(s : ScanTypes.ScanRecord) : Bool { s.id == id });
  };

  public func getPatientScans(
    scans : List.List<ScanTypes.ScanRecord>,
    patientId : Common.PatientId,
  ) : [ScanTypes.ScanRecord] {
    scans.filter(func(s : ScanTypes.ScanRecord) : Bool { s.patientId == patientId }).toArray();
  };

  /// Attaches a classification result to a scan.
  /// Returns #err("Scan not found") if the scan id does not exist — never traps on out-of-bounds.
  public func attachResult(
    scans : List.List<ScanTypes.ScanRecord>,
    id : Common.ScanId,
    result : ScanTypes.ClassificationResult,
  ) : Common.Result<ScanTypes.ScanRecord, Text> {
    switch (scans.findIndex(func(s : ScanTypes.ScanRecord) : Bool { s.id == id })) {
      case null { #err("Scan not found") };
      case (?idx) {
        // Bounds check: idx must be within [0, size)
        if (idx >= scans.size()) {
          return #err("Scan index out of bounds");
        };
        let updated : ScanTypes.ScanRecord = { scans.at(idx) with result = ?result };
        scans.put(idx, updated);
        #ok(updated);
      };
    };
  };

  public func generateShareToken(
    scans : List.List<ScanTypes.ScanRecord>,
    id : Common.ScanId,
    token : Text,
  ) : ?ScanTypes.ScanRecord {
    switch (scans.findIndex(func(s : ScanTypes.ScanRecord) : Bool { s.id == id })) {
      case null { null };
      case (?idx) {
        if (idx >= scans.size()) { return null };
        let old = scans.at(idx);
        let updated : ScanTypes.ScanRecord = switch (old.shareToken) {
          case (?_existing) { old };
          case null { { old with shareToken = ?token } };
        };
        scans.put(idx, updated);
        ?updated;
      };
    };
  };

  public func getSharedScan(
    scans : List.List<ScanTypes.ScanRecord>,
    token : Text,
  ) : ?ScanTypes.SharedScanView {
    switch (scans.find(func(s : ScanTypes.ScanRecord) : Bool {
      switch (s.shareToken) {
        case (?t) { t == token };
        case null { false };
      };
    })) {
      case null { null };
      case (?s) {
        ?{
          scanId = s.id;
          uploadedAt = s.uploadedAt;
          result = s.result;
        };
      };
    };
  };
};
