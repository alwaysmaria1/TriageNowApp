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
- If information for a field is not present in either source, omit the field entirely.
- When information appears in both sources, combine them coherently
- Prioritize objective visual findings when they complement verbal descriptions

Audio Transcription:
${args.transcription}

You are an expert medical doctor with extensive experience in clinical documentation and EHR systems. Your task is to analyze combined audio and visual clinical data and output a comprehensive medical record as a valid JSON object. The JSON object must include the following fields exactly as specified:

- **address**: An optional string representing the patient's address. If unavailable, omit this field.
- **allergies**: An optional string listing the patient's allergies. If unavailable, omit this field.
- **dateOfBirth**: An optional string with the patient's date of birth. If unavailable, omit this field.
- **name**: An optional string with the patient's name. If unavailable, omit this field.
- **patientCareNotes**: An optional string containing any additional care notes. If unavailable, omit this field.
- **phoneNumber**: An optional string with the patient's phone number. If unavailable, omit this field.
- **sex**: An optional string representing the patient's sex. If unavailable, omit this field.

Integrate the relevant details from the provided audio transcription. If you do not hear a certain field, then do not include that field in the JSON object. Extract, combine, and prioritize objective findings where applicable.

Return only a valid JSON object with these exact field names (omit fields if it is not mentioned in the transript) and no additional text.

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
  let contentStr = result.text.trim();

    // Remove starting code fence if present
    if (contentStr.startsWith("```json")) {
    contentStr = contentStr.slice("```json".length).trim();
    }

    // Remove ending code fence if present
    if (contentStr.endsWith("```")) {
    contentStr = contentStr.slice(0, -3).trim();
    }

  // Mistral's response is expected to be a stringified JSON in result. Parse it.
  let parsedContent;
  try {
    parsedContent = JSON.parse(contentStr);
  } catch (error) {
    throw new Error("Failed to parse Mistral AI response JSON");
  }

  return parsedContent;
  }
});