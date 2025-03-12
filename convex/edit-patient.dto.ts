import { v } from "convex/values";

export const EditPatientDTO = {
    barcodeID: v.string(),
    triageMemberID: v.string(),
    address: v.optional(v.string()),
    allergies: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    lastUpdated: v.string(),
    name: v.optional(v.string()),
    patientCareNotes: v.optional(v.string()),
    patientStatus: v.union(
      v.literal("Triage In-Progress"),
      v.literal("Triage Complete"),
      v.literal("Treatment In-Progress"),
      v.literal("Treatment Complete"),
      v.literal("Transport In-Progress"),
      v.literal("Transport Complete")
    ),
    phoneNumber: v.optional(v.string()),
    sex: v.optional(v.string()),
    triageStatus: v.union(
      v.literal("Minor"),
      v.literal("Delayed"),
      v.literal("Immediate"),
      v.literal("Expectant")
    ),
    zone: v.string(),
};