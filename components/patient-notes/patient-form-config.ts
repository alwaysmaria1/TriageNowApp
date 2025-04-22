import { z } from "zod";

export const patientFormSchema = z.object({
    address: z.string().optional(),
    allergies: z.string().optional(),
    dateOfBirth: z.string().optional(),
    name: z.string().optional(),
    patientCareNotes: z.string().optional(),
    patientStatus: z.union([
      z.literal("Triage In-Progress"),
      z.literal("Triage Complete"),
      z.literal("Treatment In-Progress"),
      z.literal("Treatment Complete"),
      z.literal("Transport In-Progress"),
      z.literal("Transport Complete"),
    ]).optional(),
    phoneNumber: z.string().optional(),
    sex: z.string().optional(),
    triageStatus: z.union([
      z.literal("Minor"),
      z.literal("Delayed"),
      z.literal("Immediate"),
      z.literal("Expectant"),
    ]).optional(),
    zone: z.string().optional(),
  });
  
  export type PatientFormSchemaType = z.infer<typeof patientFormSchema>;
  

export type FormField = {
  name: keyof PatientFormSchemaType;
  label: string;
  placeholder?: string;
  description?: string;
  type: "text" | "textarea" | "url" | "select";
};

export const patientFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter patient's name",
    type: "text",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    placeholder: "MM/DD/YYYY",
    type: "text",
  },
  {
    name: "sex",
    label: "Sex",
    placeholder: "Enter patient's sex",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter phone number",
    type: "text",
  },
  {
    name: "allergies",
    label: "Allergies",
    placeholder: "Enter allergies (if any)",
    type: "text",
  },
  {
    name: "patientCareNotes",
    label: "Patient Care Notes",
    placeholder: "Enter care notes",
    type: "textarea",
  },
  {
    name: "patientStatus",
    label: "Patient Status",
    placeholder: "Select patient status",
    type: "select",
  },
];

export const patientDefaultValues: PatientFormSchemaType = {
    name: "",
    dateOfBirth: "",
    sex: "",
    address: "",
    phoneNumber: "",
    allergies: "",
    patientCareNotes: "",
    patientStatus: "Triage In-Progress",
    triageStatus: "Minor", // Default value for triageStatus
    zone: "", // Default value for zone
  };
  
