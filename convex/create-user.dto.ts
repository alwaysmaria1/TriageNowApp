import { v } from "convex/values";

export const CreateUserDTO = {
    userID: v.string(),
    name: v.string(),
    role: v.string(),
    userZone: v.optional(v.string()),
};