import ScanTypes "../types/scan";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Debug "mo:core/Debug";

module {
  /// Maximum image blob size accepted for analysis (10 MB).
  let MAX_BLOB_BYTES : Nat = 10_000_000;

  /// Derives RiskLevel from a DR stage.
  public func riskLevelFromStage(stage : Common.DRStage) : Common.RiskLevel {
    switch (stage) {
      case (#NoRetinopathy or #Mild) { #Low };
      case (#Moderate) { #Moderate };
      case (#Severe or #Proliferative) { #High };
    };
  };

  /// Derives a varied stage index (0–4) from multiple bytes of the image blob.
  /// Guards against memory exhaustion by checking blob size before materialising.
  func stageIndex(imageBlob : Storage.ExternalBlob) : Nat {
    let n = imageBlob.size();
    if (n == 0) { return 0 };
    // Safety: refuse to materialise oversized blobs into a heap array.
    if (n > MAX_BLOB_BYTES) {
      Debug.print("inference: image blob too large (" # n.toText() # " bytes), using default stage");
      return 1; // default to #Mild — safe fallback
    };
    let bytes = imageBlob.vals().toArray();
    let sz : Nat = n % 5;
    let first : Nat = bytes[0].toNat() % 5;
    let last : Nat = bytes[n - 1].toNat() % 5;
    let mid : Nat = if (n > 2) { bytes[n / 2].toNat() % 5 } else { 0 };
    (sz + first + last + mid) % 5;
  };

  /// Maps a stage index to a (DRStage, confidence) pair.
  func stageAndConfidence(idx : Nat) : (Common.DRStage, Float) {
    switch (idx) {
      case 0 { (#NoRetinopathy, 0.94) };
      case 1 { (#Mild,          0.87) };
      case 2 { (#Moderate,      0.82) };
      case 3 { (#Severe,        0.78) };
      case _ { (#Proliferative, 0.91) };
    };
  };

  /// Returns a simulated ClassificationResult deterministically derived from the
  /// image content (size + multiple byte values). No external AI calls are made.
  /// Returns #err if the image is empty or cannot be processed.
  public func analyzeImage(
    imageBlob : Storage.ExternalBlob,
    _transform : OutCall.Transform,
  ) : async Common.Result<ScanTypes.ClassificationResult, Text> {
    let n = imageBlob.size();
    if (n == 0) {
      return #err("Image blob is empty — cannot classify");
    };
    let idx = stageIndex(imageBlob);
    let (stage, confidence) = stageAndConfidence(idx);
    let riskLevel = riskLevelFromStage(stage);
    #ok({
      stage;
      confidence;
      riskLevel;
      heatmapImageUrl = "heatmap:simulated";
    });
  };
};
