import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThemedText } from "@/components/ThemedText";

const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

export default function TranscribeScreen() {
  const transcribe = useAction(api.actions.deepgram.transcribeFile);
  const [result, setResult] = React.useState<string | null>(null);

  const handleTranscription = async () => {
    try {
      const apiResponse = await transcribe({ fileData: "test.m4a" });
      const transcript = apiResponse.results.channels[0]?.alternatives[0]?.transcript
      if (transcript) {
        setResult(transcript);
      }
    } catch (error) {
      console.error("Error transcribing:", error);
    }
  };

  return (

    <View style={styles.fullWidthButton}>
    <Button
        onPress={handleTranscription}
        title="Transcribe Audio"
    />
    {result && <ThemedText type="subtitle">{result}</ThemedText>}
    </View>
    
  );
};

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


