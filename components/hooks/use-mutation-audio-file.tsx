import { api } from "../../convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import * as FileSystem from "expo-file-system";
import { patientFormSchema } from "../patient-notes/patient-form-config";

export function useMutationFiles() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createMutation = useMutation(api.files.createAudio);
  const updateFileText = useMutation(api.files.updateAudioTranscription);
  const updateFileStatus = useMutation(api.files.updateAudioStatus);
  const transcribeAudio = useAction(api.actions.deepgram.transcribeFile);
  const formatTranscription = useAction(api.actions.mistral.formatTranscription);
  const updatePatient = useMutation(api.patients.update);

  // Helper function that takes in a local uri and a postURL - which in theory uploads the file to 
  // the remote URL so its easier to send to convex file storage
  const uploadFile = async (fileUri: string, postUrl: string) => {
    try {
      // Use FileSystem.uploadAsync instead of fetch with Blob conversion.
      const uploadResponse = await FileSystem.uploadAsync(postUrl, fileUri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        headers: { "Content-Type": "audio/mp4" },
      });
  
      // Parse the response body if needed.
      const responseJson = JSON.parse(uploadResponse.body);
      return responseJson;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const createFile = async (
    fileMeta: { fileUri: string; barcodeID: string }
  ): Promise<string | null> => {
    try {
    
        // STORAGE OF FILE URL TO CONVEX BEGINS HERE !!!
      const { fileUri, barcodeID } = fileMeta;
        if (!fileUri) {
            throw new Error("File URI is null");
          }
        // calls convex function which returns a unique temporary url to store the actual file
        const postUrl = await generateUploadUrl();
        // Upload the file to the provided postUrl and get the response with the storageId
        const uploadResponseJson = await uploadFile(fileUri, postUrl);
        // once the file is stored in convex storage, you receive a storage ID
      const { storageId } = uploadResponseJson;
      if (!storageId) {
        throw new Error("Storage ID is null");
      }

      // Save file metadata w/ storage ID in Convex and get the public URL.
      const { audioId, url } = await createMutation({
        patientBarcode: barcodeID,
        storageId: storageId as Id<"_storage">,
      });

      // TRANSCRIPTION VOICE TO TEXT BEGINS HERE !!!!
      // Set status to pending for current audio upload
      await updateFileStatus({ fileId: audioId, status: "pending" });
      
      // Pass the public URL into the transcribeAudio action.
      const transcriptionResult = await transcribeAudio({
        fileData: url,
      });
      
      // saves the transcription in the db associated with audio
      await updateFileText({
        fileId: audioId,
        transcription: transcriptionResult || "NOTHING SAVED",
      });
      await updateFileStatus({ fileId: audioId, status: "processed" });

    // calls mistral to format the transcription accordingly
      const patientUpdateSchema = patientFormSchema.partial();
      const parsedRaw = await formatTranscription({transcription: transcriptionResult});
      const result = patientUpdateSchema.safeParse(parsedRaw);
      if (!result.success) {
        console.error(result.error);
        throw new Error("Transcription data did not conform to the expected schema.");
      }
      const finalTranscription = result.data;

      //update the patient accordingly
      // updatePatient({
      //   barcodeID,
      //   ...finalTranscription
      // })
      //NOTE: TODO: FIX THE PIPELINE OF GETTING THE SPECIFIC PATIENT SINCE ITS HARDCODED
      updatePatient({
        barcodeID: "2128",
        ...finalTranscription
      })



    return "testing current file storage";
    } catch (error) {
      alert((error as Error).message || "Please try again later");
      return null;
    }
  };

  return {
    add: createFile,
  };
}

