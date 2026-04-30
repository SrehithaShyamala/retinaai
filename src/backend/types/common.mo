module {
  public type PatientId = Nat;
  public type ScanId = Nat;
  public type Timestamp = Int;

  public type Result<T, E> = { #ok : T; #err : E };

  /// DR severity levels
  public type DRStage = {
    #NoRetinopathy;
    #Mild;
    #Moderate;
    #Severe;
    #Proliferative;
  };

  /// Risk level derived from DR stage
  public type RiskLevel = {
    #Low;      // NoRetinopathy, Mild
    #Moderate; // Moderate
    #High;     // Severe, Proliferative
  };
};
