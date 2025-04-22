import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createAudio = mutation({
    args: {
      patientBarcode: v.string(),
      storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const url = await ctx.storage.getUrl(args.storageId);
        if (url === null) {
            throw new ConvexError("Failed to retrieve URL: URL is null");
        }
        const audioId = await ctx.db.insert("audioFiles", {
            barcodeID: args.patientBarcode,
            storageId: args.storageId,
            url,
            status: "pending",
        });
        return { audioId, url };

    },
  });

export const updateAudioTranscription = mutation({
  args: {
    fileId: v.id("audioFiles"),
    transcription: v.string(),
  },
  handler: async (ctx, args) => {
    const audio = await ctx.db.get(args.fileId);
    if (!audio) {
      throw new ConvexError({ code: 404, message: "Audio file not found" });
    }
    await ctx.db.patch(args.fileId, {
      transcription: args.transcription,
      status: "processed",
    });
    return true;
  },
});

export const updateAudioStatus = mutation({
  args: {
    fileId: v.id("audioFiles"),
    status: v.union(
        v.literal("pending"),
        v.literal("processed"),
        v.literal("error")
      ),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const audio = await ctx.db.get(args.fileId);
    if (!audio) {
      throw new ConvexError({ code: 404, message: "Audio file not found" });
    }
    await ctx.db.patch(args.fileId, {
      status: args.status,
    });
    return true;
  },
});

export const removeAudio = mutation({
  args: {
    fileId: v.id("audioFiles"),
  },
  handler: async (ctx, args) => {
    const audio = await ctx.db.get(args.fileId);
    if (!audio) {
      throw new ConvexError({ code: 404, message: "Audio file not found" });
    }
    await ctx.db.delete(args.fileId);
    await ctx.storage.delete(audio.storageId);
    return true;
  },
});

