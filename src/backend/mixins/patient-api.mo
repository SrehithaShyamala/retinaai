import List "mo:core/List";
import PatientLib "../lib/patient";
import PatientTypes "../types/patient";
import Common "../types/common";

mixin (
  patients : List.List<PatientTypes.Patient>,
) {
  var nextPatientId : Nat = 1;

  /// Create a health profile for the calling patient (once per principal).
  /// Returns #err if a profile already exists — never traps.
  public shared ({ caller }) func createProfile(input : PatientTypes.CreatePatientInput) : async Common.Result<PatientTypes.Patient, Text> {
    switch (PatientLib.getPatientByPrincipal(patients, caller)) {
      case (?_) { #err("Profile already exists for this identity") };
      case null {
        let patient = PatientLib.createPatient(patients, nextPatientId, caller, input);
        nextPatientId += 1;
        #ok(patient);
      };
    };
  };

  /// Update the calling patient's own health profile.
  public shared ({ caller }) func updateProfile(input : PatientTypes.UpdatePatientInput) : async Common.Result<PatientTypes.Patient, Text> {
    switch (PatientLib.updatePatient(patients, caller, input)) {
      case (?updated) { #ok(updated) };
      case null { #err("Profile not found") };
    };
  };

  /// Retrieve the calling patient's own health profile.
  public query ({ caller }) func getMyProfile() : async ?PatientTypes.Patient {
    PatientLib.getPatientByPrincipal(patients, caller);
  };
};
