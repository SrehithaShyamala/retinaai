import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/patient";
import Common "../types/common";

module {
  public func createPatient(
    patients : List.List<Types.Patient>,
    nextId : Nat,
    caller : Principal,
    input : Types.CreatePatientInput,
  ) : Types.Patient {
    let now = Time.now();
    let patient : Types.Patient = {
      id = nextId;
      principal = caller;
      name = input.name;
      age = input.age;
      contactInfo = input.contactInfo;
      diabetesType = input.diabetesType;
      hbA1c = input.hbA1c;
      createdAt = now;
      updatedAt = now;
    };
    patients.add(patient);
    patient;
  };

  public func updatePatient(
    patients : List.List<Types.Patient>,
    caller : Principal,
    input : Types.UpdatePatientInput,
  ) : ?Types.Patient {
    switch (patients.findIndex(func(p : Types.Patient) : Bool { p.principal == caller })) {
      case null { null };
      case (?idx) {
        let old = patients.at(idx);
        let updated : Types.Patient = {
          old with
          name = input.name;
          age = input.age;
          contactInfo = input.contactInfo;
          diabetesType = input.diabetesType;
          hbA1c = input.hbA1c;
          updatedAt = Time.now();
        };
        patients.put(idx, updated);
        ?updated;
      };
    };
  };

  public func getPatientByPrincipal(
    patients : List.List<Types.Patient>,
    caller : Principal,
  ) : ?Types.Patient {
    patients.find(func(p : Types.Patient) : Bool { p.principal == caller });
  };
};
