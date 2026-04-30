import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import List "mo:core/List";
import PatientTypes "types/patient";
import ScanTypes "types/scan";
import PatientMixin "mixins/patient-api";
import ScanMixin "mixins/scan-api";



actor {
  // Object storage infrastructure — must be included first
  include MixinObjectStorage();

  // HTTP outcall transform — required by IC HTTP outcalls protocol
  // Wrapped defensively: if transform logic errors, return the response unchanged
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    try {
      OutCall.transform(input);
    } catch (_) {
      { status = input.response.status; headers = []; body = input.response.body };
    };
  };

  // State
  let patients = List.empty<PatientTypes.Patient>();
  let scans = List.empty<ScanTypes.ScanRecord>();

  // Domain mixins
  include PatientMixin(patients);
  include ScanMixin(scans, patients, transform);
};
