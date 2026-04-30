import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// AI classification output for one fundus image
  public type ClassificationResult = {
    stage : Common.DRStage;
    confidence : Float;
    riskLevel : Common.RiskLevel;
    heatmapImageUrl : Text;
  };

  /// A single fundus scan record belonging to a patient
  public type ScanRecord = {
    id : Common.ScanId;
    patientId : Common.PatientId;
    imageId : Storage.ExternalBlob;
    uploadedAt : Common.Timestamp;
    result : ?ClassificationResult;
    shareToken : ?Text;
  };

  /// Input required to create a new scan
  public type CreateScanInput = {
    imageId : Storage.ExternalBlob;
  };

  /// Shared (public) view of a scan result — no patient PII
  public type SharedScanView = {
    scanId : Common.ScanId;
    uploadedAt : Common.Timestamp;
    result : ?ClassificationResult;
  };
};
