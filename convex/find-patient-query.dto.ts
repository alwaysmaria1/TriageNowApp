import { v } from "convex/values";

export const FindPatientsDTO = {
    zone: v.optional(v.string()),
    triageStatus: v.optional(v.string()),
    patientStats: v.optional(v.string()),
    recency: v.optional(v.string()), // ?
};