// import { query, mutation } from "./_generated/server";
// import { ConvexError, v } from "convex/values";
// import { CreateUserDTO } from "./create-user.dto";


import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});


// export const createUser = mutation({
//   args: CreateUserDTO,
//   handler: async (ctx, args) => {
//     const userId = await ctx.db.insert("users", args);

//     const createdUser = await ctx.db.get(userId);
//     return createdUser;
//   },
// });

export const getAll = query({
  handler: async (ctx) => {
    return ctx.db.query("users").collect();
  }

});

// export const getOne = query({
//   args: {userID: v.string()},
//   handler: async (ctx, args) => {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_userID", (q) => q.eq("userID", args.userID))
//       .first();

//     if (!user) {
//       throw new ConvexError({
//         code: 404,
//         message: "User not found",
//       });
//     }

//     return user;
//   },
// });