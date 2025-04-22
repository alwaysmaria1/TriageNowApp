import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Asset } from "expo-asset";

const { createClient } = require("@deepgram/sdk");
// const fileUri = require("../../assets/test.m4a");
// const fs = require("fs");
// import RNFS from "react-native-fs";

import * as FileSystem from 'expo-file-system';

export default function TranscribeScreen() {
  // const transcribe = useAction(api.actions.deepgram.transcribeFile);
  const [result, setResult] = React.useState<string | null>(null);

  // Assumption: Audio file will be uploading in assets folder
  const getFileUri = async () => {
    const asset = Asset.fromModule(require("../../assets/test.m4a"));
    await asset.downloadAsync(); // Ensure the file is available
    return asset.localUri;
  };

  const handleTranscription = async () => {
    try {
        // Connect to Deepgram via API key
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY); // replace key with process.env.DEEPGRAM_API_KEY

        // const file = RNFS.readFile("../test.m4a", "base64")
        // const fileUri = FileSystem.documentDirectory + "test.m4a";

        const fileUri = await getFileUri();
        // console.log("File URI:", fileUri);

        if (fileUri) {

            const base64String = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
            let binaryData = new Uint8Array(atob(base64String).split('').map(char => char.charCodeAt(0)));
            // console.log("Base64 Data (First 100 chars):", file.substring(0, 100));

            const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
                binaryData,
                {
                    model: "nova-3",
                    smart_format: true,
                }
            );
            const transcript = result.results.channels[0]?.alternatives[0]?.transcript
            if (transcript) {
                setResult(transcript);
            }
        }
    } catch (error) {
      console.error("Error transcribing:", error);
    }
  };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={<></>}
        >
        <View style={styles.fullWidthButton}>
            <Button
                onPress={handleTranscription}
                title="Transcribe Audio"
            />
            {result && <ThemedText type="subtitle">{result}</ThemedText>}
        </View>
        </ParallaxScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    titleContainer: {
      marginBottom: 16,
      alignItems: 'center',
    },
    positionAirwayText: {
      textAlign: 'center',
      marginVertical: 40,
      textDecorationLine: 'underline'
    },
    button: {
      backgroundColor: "#D3D3D3", // Light grey
    },
    buttonContainer: {
      flex: 1,
      marginHorizontal: 5,
    },
    fullWidthButton: {
      marginVertical: 40,
      marginHorizontal: 5,
    },
    overrideLabel: {
      marginBottom: 16,
    },
    overrideRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
  });


