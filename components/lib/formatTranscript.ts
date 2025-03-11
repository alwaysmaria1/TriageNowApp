export function formatTranscriptionAsString(data: {
    address?: string;
    name?: string;
    allergies?: string;
    dateOfBirth?: string;
    patientCareNotes?: string;
    patientStatus?: string;
    phoneNumber?: string;
    sex?: string;
    triageStatus?: string;
    zone?: string;
  }): string {
    const fields = [
      { label: "Name", value: data.name },
      { label: "Address", value: data.address },
      { label: "Date of Birth", value: data.dateOfBirth },
      { label: "Phone Number", value: data.phoneNumber },
      { label: "Sex", value: data.sex },
      { label: "Zone", value: data.zone },
      { label: "Allergies", value: data.allergies },
      { label: "Patient Care Notes", value: data.patientCareNotes },
      { label: "Patient Status", value: data.patientStatus },
      { label: "Triage Status", value: data.triageStatus },
    ];
  
    // Filter out fields that are undefined or empty
    return fields
      .filter((field) => field.value !== undefined && field.value !== "")
      .map((field) => `${field.label}: ${field.value}`)
      .join("\n");
  }
  
//   // Example usage:
//   const finalTranscription = {
//     name: "Jane Doe",
//     address: "123 Main St",
//     dateOfBirth: "01/01/1975",
//     phoneNumber: "555-1234",
//     sex: "Female",
//     zone: "East Wing",
//     allergies: "None",
//     patientCareNotes: "Patient stable.",
//     patientStatus: "Triage Complete",
//     triageStatus: "Minor",
//   };
  
//   const formattedString = formatTranscription(finalTranscription);
//   console.log(formattedString);
  