import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

const patientSchema = {
  triageColor: v.string(),
}

const patientSchemaObject = v.object(patientSchema);
export type PatientType = Infer<typeof patientSchemaObject>;

export default defineSchema({
  patients: defineTable(patientSchema)
});
