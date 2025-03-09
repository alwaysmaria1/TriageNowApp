import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { CreateUserDTO } from "./create-user.dto";



export const createUser = mutation({
  args: CreateUserDTO,
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", args);
    
    return userId;
  },
});

export const getAll = query({

  // args: FindUsersDTO,

  handler: async (ctx) => {
    return ctx.db.query("users").collect();
    // let query = ctx.db.query("users");
   

    // // if (args.userZone) {
    // //   query = query.filter((q) => q.eq("userZone", args.userZone));
    // // }

    // const users = await query.collect();
    // // let zoneUsers = users;
    // return users;

  }

});