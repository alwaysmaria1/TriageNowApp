import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { CreatePatientDTO } from "./create-patient.dto";
import { FindPatientsDTO } from "./find-patient-query.dto";
import { EditPatientDTO } from "./edit-patient.dto";

export const getAll = query({
  args: FindPatientsDTO,
  handler: async (ctx) => {
    return ctx.db.query("patients").collect();
  },
  // Future: filter by zone, triageStatus, patientStatus, recency
  // based on requirements of incident commander
});

export const getOne = query({
  args: {barcodeID: v.string()},
  handler: async (ctx, args) => {
    const patient = await ctx.db
      .query("patients")
      .withIndex("by_barcodeID", (q) => q.eq("barcodeID", args.barcodeID))
      .first();

    if (!patient) {
      throw new ConvexError({
        code: 404,
        message: "Patient not found",
      });
    }

    return patient;
  },
});

export const create = mutation({
  args: CreatePatientDTO,
  handler: async (ctx, args) => {
    const patientId = await ctx.db.insert("patients", {
      barcodeID: args.barcodeID, // Required
      triageMemberID: args.triageMemberID, // REQUIRED?
      name: args.name ?? "Missing info",
      dateOfBirth: args.dateOfBirth ?? "Missing info",
      sex: args.sex ?? "Missing info",
      address: args.address ?? "Missing info",
      phoneNumber: args.phoneNumber ?? "Missing info",
      allergies: args.allergies ?? "Missing info",
      zone: args.zone, // Required
      triageStatus: args.triageStatus, // Required
      patientCareNotes: args.patientCareNotes ?? "Missing info",
      patientStatus: "Triage Complete", // Required
      lastUpdated: new Date().toISOString(),
    });

    const patient = await ctx.db.get(patientId);
    return patient;
  },
});
  
export const update = mutation({
  args: EditPatientDTO,

  handler: async (ctx, args) => {
    // Find the patient by barcodeID
    const patient = await ctx.db
      .query("patients")
      .withIndex("by_barcodeID", (q) => q.eq("barcodeID", args.barcodeID))
      .first();

      if (!patient) {
        throw new ConvexError({
          code: 404,
          message: "Patient not found",
        });
      }

      // Use the patient's _id to patch the record
      await ctx.db.patch(patient._id, {
        barcodeID: args.barcodeID, // Required
        name: args.name ?? "Missing info",
        dateOfBirth: args.dateOfBirth ?? "Missing info",
        sex: args.sex ?? "Missing info",
        address: args.address ?? "Missing info",
        phoneNumber: args.phoneNumber ?? "Missing info",
        allergies: args.allergies ?? "Missing info",
        zone: args.zone, // Required
        triageStatus: args.triageStatus, // Required
        patientCareNotes: args.patientCareNotes ?? "Missing info",
        patientStatus: "Triage Complete", // Required
        lastUpdated: new Date().toISOString(),
      });

      const updatedPatient = await ctx.db.get(patient._id);
      return updatedPatient;
  },
});

export const remove = mutation({
  args: {barcodeID: v.string()},
  handler: async (ctx, args) => {
    // Find the patient by barcodeID
    const patient = await ctx.db
      .query("patients")
      .withIndex("by_barcodeID", (q) => q.eq("barcodeID", args.barcodeID))
      .first();
  
      if (!patient) {
        throw new ConvexError({
          code: 404,
          message: "Patient not found",
        });
      }

      // Use the patient's _id to delete the record
      await ctx.db.delete(patient._id);

      return `Patient ${args.barcodeID} successfully deleted`;
  },
});
