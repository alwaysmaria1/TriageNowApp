import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

const patientSchema = {
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

const userSchema = {
  userID: v.string(),
  name: v.string(),
  role: v.string(),
  userZone: v.string(),
}

const audioFile = {
  barcodeID: v.string(),
  storageId: v.id("_storage"),
  url: v.string(),
  status: v.union(
    v.literal("pending"),
    v.literal("processed"),
    v.literal("error")
  ),
  transcription: v.optional(v.string()),
};

export default defineSchema({
  patients: defineTable(patientSchema).index("by_barcodeID", ["barcodeID"]),

  // inserting new users table:
  users: defineTable(userSchema).index("by_userID", ["userID"]),
  audioFiles: defineTable(audioFile).index("by_barcodeID", ["barcodeID"]),
});

