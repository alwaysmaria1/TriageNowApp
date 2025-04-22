import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Audio, Recording, Sound } from 'expo-av';
import { useMutationFiles } from '@/components/hooks/use-mutation-audio-file';
import { Asset } from "expo-asset";
import { IOSOutputFormat } from 'expo-av/build/Audio';
import { useLocalSearchParams } from 'expo-router';

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
    outputFormat: IOSOutputFormat.MPEG4AAC,
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
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const { barcodeID } = useLocalSearchParams<{ barcodeID: string }>();

  // Hook for processing/uploading the audio file
  const { add: processAudio } = useMutationFiles();

  // Starts the audio recording
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
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  // Stops recording and saves the file URI
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedURI(uri);
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
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        { uri: recordedURI },
        { shouldPlay: true }
      );
      setSound(playbackSound);
      setIsPlaying(true);

      playbackSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing sound', error);
    }
  };

  // Stops playback if in progress
  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };


  // Upload the recording using the custom hook
  const handleUploadRecording = async () => {
    if (!recordedURI) {
      alert('No recording available to upload');
      return;
    }
    try {
      setIsTranscribing(true);
      const finalTranscription = await processAudio({ fileUri: recordedURI, barcodeID });
      
      if (finalTranscription) {
        setTranscription(finalTranscription);
        alert('Audio processed and uploaded successfully.');
      } else {
        alert('Audio processing failed.');
      }
      setIsTranscribing(false);
    } catch (error) {
      console.error('Upload error', error);
      alert('Error uploading audio');
    }
  };

  // Cleanup sound resource when the component unmounts
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Voice-To-Text Patient Info</Text>
      <Text style={styles.instructions}>
        Please record patient information by describing the following details:
      </Text>
      <Text style={styles.instructions}>
        (Only say the information you know)
      </Text>
      <View style={styles.instructionsList}>
        <Text style={styles.instructionItem}>• Patient Name</Text>
        <Text style={styles.instructionItem}>• Date of Birth</Text>
        <Text style={styles.instructionItem}>• Sex</Text>
        <Text style={styles.instructionItem}>• Address</Text>
        <Text style={styles.instructionItem}>• Allergies</Text>
        <Text style={styles.instructionItem}>• Phone Number</Text>
        <Text style={styles.instructionItem}>• Patient Care Notes</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, isRecording ? styles.buttonStop : styles.buttonRecord]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* {recordedURI && (
        <Text style={styles.uriText}>Recorded file URI: {recordedURI}</Text>
      )} */}

      {recordedURI && (
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, isPlaying ? styles.buttonStop : styles.buttonPlay]}
          onPress={isPlaying ? stopPlayback : playRecording}
          disabled={!recordedURI}
        >
          <Text style={styles.buttonText}>
            {isPlaying ? 'Stop Playback' : 'Play Recording'}
          </Text>
        </TouchableOpacity>
      </View>
      )}

      {recordedURI && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.buttonUpload]}
            onPress={handleUploadRecording}
            disabled={isTranscribing}
          >
            <Text style={styles.buttonText}>
              {isTranscribing ? 'Transcribing & Uploading...' : 'Upload Recording'}
            </Text>
          </TouchableOpacity>
        </View>
      )}


      {transcription !== '' && (
              <View style={styles.transcriptionContainer}>
                <Text style={styles.transcriptionTitle}>Transcription:</Text>
                <Text style={styles.transcriptionText}>{transcription}</Text>
              </View>
            )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  instructionsList: {
    marginBottom: 20,
  },
  instructionItem: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
  buttonGroup: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: '60%',
    alignItems: 'center',
  },
  buttonRecord: {
    backgroundColor: '#8db096',
  },
  buttonStop: {
    backgroundColor: '#cc5c54',
  },
  buttonPlay: {
    backgroundColor: '#5d98c9',
  },
  buttonTranscribe: {
    backgroundColor: '#9C27B0',
  },
  buttonUpload: {
    backgroundColor: '#edaf53',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  uriText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  transcriptionContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '100%',
  },
  transcriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  transcriptionText: {
    fontSize: 16,
    color: '#444',
  },
});

