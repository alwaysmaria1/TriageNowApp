import { v } from "convex/values";

export const FindPatientsDTO = v.object({
    zone: v.optional(v.string()),
    triageStatus: v.optional(v.string()),
    patientStats: v.optional(v.string()),
    recency: v.optional(v.string()), // ?
    sortField: v.optional(v.string()),
    sortDirection: v.optional(v.string())
});