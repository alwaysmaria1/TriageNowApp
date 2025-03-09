import { z } from "zod";

export const patientFormSchema = z.object({
  barcodeID: z.string(),
  address: z.string().optional(),
  allergies: z.string().optional(),
  dateOfBirth: z.string().optional(),
  lastUpdated: z.string(),
  name: z.string().optional(),
  patientCareNotes: z.string().optional(),
  patientStatus: z.union([
    z.literal("Triage In-Progress"),
    z.literal("Triage Complete"),
    z.literal("Treatment In-Progress"),
    z.literal("Treatment Complete"),
    z.literal("Transport In-Progress"),
    z.literal("Transport Complete"),
  ]),
  phoneNumber: z.string().optional(),
  sex: z.string().optional(),
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
    name: "barcodeID",
    label: "Barcode ID",
    placeholder: "Enter Barcode ID",
    type: "text",
  },
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
  {
    name: "lastUpdated",
    label: "Last Updated",
    placeholder: "Auto-generated timestamp",
    type: "text",
  },
];

export const patientDefaultValues: PatientFormSchemaType = {
  barcodeID: "",
  name: "",
  dateOfBirth: "",
  sex: "",
  address: "",
  phoneNumber: "",
  allergies: "",
  patientCareNotes: "",
  // Default to one of the union values.
  patientStatus: "Triage In-Progress",
  lastUpdated: new Date().toISOString(),
};
