"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import { mistral } from '@ai-sdk/mistral';
import { generateText } from 'ai';

//possible context window issues

export const formatTranscription = action({
  args: { transcription: v.string() }, 
  handler: async (ctx, args) => {
  if (!args.transcription) {
    throw new Error("Missing required field: transcription");
  }

  const prompt = `
You are an expert medical doctor with extensive experience in clinical documentation and EHR systems. 
Your task is to analyze both the transcribed consultation and visual assessment data to create a comprehensive medical record.

Please combine and parse both sources of information with high attention to medical accuracy and detail. For each field:
- Extract and combine relevant information from both the audio transcription and visual assessment
- Use standard medical terminology
- Maintain clinical relevance
- If information for a field is not present in either source, return an empty string
- When information appears in both sources, combine them coherently
- Prioritize objective visual findings when they complement verbal descriptions

Audio Transcription:
${args.transcription}

You are an expert medical doctor with extensive experience in clinical documentation and EHR systems. Your task is to analyze combined audio and visual clinical data and output a comprehensive medical record as a valid JSON object. The JSON object must include the following fields exactly as specified:

- **address**: An optional string representing the patient's address. If unavailable, return an empty string.
- **allergies**: An optional string listing the patient's allergies. If unavailable, return an empty string.
- **dateOfBirth**: An optional string with the patient's date of birth. If unavailable, return an empty string.
- **name**: An optional string with the patient's name. If unavailable, return an empty string.
- **patientCareNotes**: An optional string containing any additional care notes. If unavailable, return an empty string.
- **phoneNumber**: An optional string with the patient's phone number. If unavailable, return an empty string.
- **sex**: An optional string representing the patient's sex. If unavailable, return an empty string.

Integrate the relevant details from the provided audio transcription. Extract, combine, and prioritize objective findings where applicable. If any optional field is missing in both sources, use an empty string for that field.

Return only a valid JSON object with these exact field names and no additional text.

`;

  // Use the Vercel SDK provider for Mistral to send the chat completion request.
  const result = await generateText({
    messages: [
      {
        role: "system",
        content:
          "You are an expert medical documentation specialist skilled in integrating verbal and visual clinical information.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: mistral('mistral-large-latest'),
    temperature: 0.1,
  });

  // Mistral's response is expected to be a stringified JSON in result. Parse it.
  let parsedContent;
  try {
    parsedContent = JSON.stringify(result.response.messages);
    console.log(parsedContent)
  } catch (error) {
    throw new Error("Failed to parse Mistral AI response JSON");
  }


  return parsedContent;
  }
});