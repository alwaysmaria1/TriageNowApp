import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    role: v.string(),
    zone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      role: args.role,
      zone: args.zone,
    });
    
    return userId;
  },
});