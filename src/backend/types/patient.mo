import Common "common";

module {
  public type DiabetesType = {
    #Type1;
    #Type2;
    #Gestational;
    #None;
  };

  public type Patient = {
    id : Common.PatientId;
    principal : Principal;
    name : Text;
    age : Nat;
    contactInfo : Text;
    diabetesType : DiabetesType;
    hbA1c : ?Float;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreatePatientInput = {
    name : Text;
    age : Nat;
    contactInfo : Text;
    diabetesType : DiabetesType;
    hbA1c : ?Float;
  };

  public type UpdatePatientInput = {
    name : Text;
    age : Nat;
    contactInfo : Text;
    diabetesType : DiabetesType;
    hbA1c : ?Float;
  };
};
