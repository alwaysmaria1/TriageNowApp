import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
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

export const getOne = query({
  args: {userID: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userID", (q) => q.eq("userID", args.userID))
      .first();

    if (!user) {
      throw new ConvexError({
        code: 404,
        message: "User not found",
      });
    }

    return user;
  },
});