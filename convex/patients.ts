import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("patients").collect();
  },
});

export const getOne = query({
  args: {},
  handler: async (ctx, args) => {},
});

export const create = mutation({
    args: {
      triageColor: v.string(),
    },
    handler: async (ctx, args) => {
      const patientId = await ctx.db.insert("patients", {
        triageColor: args.triageColor,
      });
      return patientId;
    },
  });
  

export const update = mutation({
  args: {},
  handler: async (ctx, args) => {},
});

export const remove = mutation({
  args: {},
  handler: async (ctx, args) => {},
});
