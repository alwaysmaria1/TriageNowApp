import { v } from "convex/values";

export const CreateUserDTO = {
    //convex adds _id
    //convex adds _creationTime
    userID: v.string(),
    name: v.string(),
    role: v.string(),
    // userZone: v.optional(v.string()),
    userZone: v.string(),
};