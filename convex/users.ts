import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { FindUsersDTO } from "./find-user-query.dto";



export const createUser = mutation({
  args: {
    role: v.string(),
    userZone: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      role: args.role,
      userZone: args.userZone,
    });
    
    return userId;
  },
});

export const getAll = query({

  args: FindUsersDTO,

  handler: async (ctx, args) => {
    
    let query = ctx.db.query("users");
   

    if (args.userZone) {
      query = query.filter((q) => q.eq("userZone", args.userZone));
    }

    const users = await query.collect();
    // let zoneUsers = users;
    return users;

  }

});