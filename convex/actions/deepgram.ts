"use node";

import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { createClient } from "@deepgram/sdk";

export const transcribeFile = action({
  args: { fileData: v.string() }, // here fileData is the public URL
  handler: async (_, { fileData }) => {
    try {
      // Initialize Deepgram client with your API key.
      const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

      // Call the transcribeUrl method with the public URL.
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: fileData },
        {
          model: "nova-3",
          smart_format: true,
        }
      );

      if (error) {
        throw new ConvexError(error.message);
      }

      // Extract the transcript if available.
      let transcript = "";
      if (
        result &&
        result.results &&
        result.results.channels &&
        result.results.channels.length > 0 &&
        result.results.channels[0].alternatives &&
        result.results.channels[0].alternatives.length > 0
      ) {
        transcript = result.results.channels[0].alternatives[0].transcript;
      }
      
      if (!transcript) {
        throw new ConvexError("No transcript received. The audio file may be corrupt or in an unsupported format.");
      }
      
      return transcript;
    } catch (error) {
      console.error("Error transcribing:", error);
      throw error;
    }
  },
});





// "use node"

// import { ConvexError, v } from "convex/values";
// import { action } from "../_generated/server";
// import { createClient } from "@deepgram/sdk";
// import { Buffer } from 'buffer';

// export const transcribeFile = action({
//   args: { fileData: v.string() },
//   handler: async (_, { fileData }) => {
//     const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

//     // Convert base64 to Buffer
//     const audioBuffer = Buffer.from(fileData, "base64");

//     // Make the Deepgram API request
//     const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
//       audioBuffer,
//       { model: "nova-3", smart_format: true }
//     );

//     if (error) throw new ConvexError(error.message);

//     let transcript = "";
//     if (
//       result &&
//       result.results &&
//       result.results.channels &&
//       result.results.channels.length > 0 &&
//       result.results.channels[0].alternatives &&
//       result.results.channels[0].alternatives.length > 0
//     ) {
//       transcript = result.results.channels[0].alternatives[0].transcript || "";
//     }
//     return transcript;
//   },
// });


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
