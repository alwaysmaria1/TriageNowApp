import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio, Recording, Sound } from 'expo-av';
import { useMutationFiles } from '@/components/hooks/use-mutation-audio-file';
import { Asset } from "expo-asset";

// Manually defined constants
const AUDIO_ENCODER_AAC = 3;
const IOS_AUDIO_QUALITY_HIGH = 96;

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    audioQuality: IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function RecordAudioScreen() {
  const [recording, setRecording] = useState<Recording | null>(null);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //Import the hook and extract the "add" function for processing audio.
  const { add: processAudio } = useMutationFiles();

  // Starts audio recording
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Permission to access the microphone is required!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording...');
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  // Stops audio recording and stores the URI
  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      setIsRecording(false);
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedURI(uri);
        console.log('Recording stopped and stored at', uri);
        setRecording(null);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  // Plays back the recorded audio
  const playRecording = async () => {
    if (!recordedURI) {
      alert('No recording available to play!');
      return;
    }
    try {
      console.log('Loading sound...');
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        { uri: recordedURI },
        { shouldPlay: true }
      );
      setSound(playbackSound);
      setIsPlaying(true);

      // Update playback status to reset isPlaying when finished
      playbackSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
      console.log('Playback started');
    } catch (error) {
      console.error('Error playing sound', error);
    }
  };

  // Stops playback if it's currently playing
  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      console.log('Playback stopped');
    }
  };

  // Function to upload the recording using the hook
  const handleUploadRecording = async () => {
    if (!recordedURI) {
      alert("No recording available to upload");
      return;
    }
    try {
      // Provide a valid barcode ID for your use case.
      const barcodeID = "123456"; 
    // TESTING WITH ASSET FILE -- WORKS END to END
        //   const asset = Asset.fromModule(require("../../assets/test.m4a"));
        //   await asset.downloadAsync();
            
        //   // Get the local URI from the asset.
        //   const fileUri = asset.localUri;
      const fileId = await processAudio({ fileUri: recordedURI, barcodeID });
      if (fileId) {
        alert("Audio processed and uploaded successfully.");
      } else {
        alert("Audio processing failed.");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Error uploading audio");
    }
  };

  // Cleanup sound resource on unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Recorder & Player</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {recordedURI && (
        <Text style={styles.uriText}>Recorded file URI: {recordedURI}</Text>
      )}
      <Button
        title={isPlaying ? 'Stop Playback' : 'Play Recording'}
        onPress={isPlaying ? stopPlayback : playRecording}
        disabled={!recordedURI}
      />
      {recordedURI && (
        <Button
          title="Upload Recording"
          onPress={handleUploadRecording}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  uriText: {
    marginVertical: 20,
    textAlign: 'center',
  },
});
