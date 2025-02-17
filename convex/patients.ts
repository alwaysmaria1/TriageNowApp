import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { CreatePatientDTO } from "./create-patient.dto";
import { FindOnePatientDTO } from "./find-patient-query.dto";
import { EditPatientDTO } from "./edit-patient.dto";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("patients").collect();
  },
  // Future: filter by zone, triageStatus, patientStatus, recency
});

export const getOne = query({
  args: FindOnePatientDTO,
  handler: async (ctx, args) => {
    const patient = await ctx.db
      .query("patients")
      .withIndex("by_barcodeID", (q) => q.eq("barcodeID", args.barcodeId))
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
      barcodeID: args.barcodeID, // Input required
      name: args.name ?? "Missing info",
      dateOfBirth: args.dateOfBirth ?? "Missing info",
      sex: args.sex ?? "Missing info",
      address: args.address ?? "Missing info",
      phoneNumber: args.phoneNumber ?? "Missing info",
      allergies: args.allergies ?? "Missing info",
      zone: args.zone, // Input required
      triageStatus: args.triageStatus, // Input required
      patientCareNotes: args.patientCareNotes ?? "Missing info",
      patientStatus: "Triage In-Progress", // Input required
      lastUpdated: new Date().toISOString(),
    });

    return patientId;
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
        barcodeID: args.barcodeID, // Input required
        name: args.name ?? "Missing info",
        dateOfBirth: args.dateOfBirth ?? "Missing info",
        sex: args.sex ?? "Missing info",
        address: args.address ?? "Missing info",
        phoneNumber: args.phoneNumber ?? "Missing info",
        allergies: args.allergies ?? "Missing info",
        zone: args.zone, // Input required
        triageStatus: args.triageStatus, // Input required
        patientCareNotes: args.patientCareNotes ?? "Missing info",
        patientStatus: "Triage In-Progress", // Input required
        lastUpdated: new Date().toISOString(),
      });

    return patient;
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

      return `Patient ${args.barcodeID} asuccessfully deleted`;
  },
});
