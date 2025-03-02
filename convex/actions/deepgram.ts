"use node"

import { v } from "convex/values";
import { action } from "../_generated/server";
import { createClient } from "@deepgram/sdk";
import { Buffer } from 'buffer';


export const transcribeFile = action({
  args: { fileData: v.string()},
  handler: async (_, { fileData }) => {
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

    // Convert base64 to Buffer
    const audioBuffer = Buffer.from(fileData, "base64");

    // Make the Deepgram API request
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      { model: "nova-3", smart_format: true }
    );

    if (error) throw new Error(error.message);

    return result;
  },
});


/*
export const transcribeFile = mutation({
    args: { fileData: v.string() },
    handler: async (ctx, { fileData }) => {
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        const audioBuffer = Buffer.from(fileData, "base64");
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            audioBuffer,
            { model: "nova-3", smart_format: true }
        );
    
        if (error) throw new Error(error.message);
    
        return result;
    },
});
*/

/*
export const transcribeFile = mutation(async ({}) => {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
  const fs = require("fs");

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync("test.m4a"),
    { model: "nova-3", smart_format: true }
  );

  if (error) throw new Error(error.message);

  return result;
});
*/
