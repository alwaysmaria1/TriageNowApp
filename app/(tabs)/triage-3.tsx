import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton as Button } from '@/components/ThemedButton';
import * as ImagePicker from 'expo-image-picker';
import { useMutationPatient } from '@/components/hooks/use-mutation-patient';
import { CreatePatientDTO, TriageStatus } from "@/components/lib/types";
import Question from "@/components/triage/question";
import { useTriageLogic } from "@/components/hooks/use-triage-logic";
import Questions from "@/components/triage/questions";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useStore } from "@/components/lib/store";
import { current } from "immer";

export default function TabThreeScreen() {
  // router needed to link to patient notes page  
  const router = useRouter();
    // States to capture user input
    const [ableToWalk, setAbleToWalk] = useState<string | null>(null);
    const [firstSpontaneousBreathing, setFirstSpontaneousBreathing] = useState<string | null>(null);
    const [secondSpontaneousBreathing, setSecondSpontaneousBreathing] = useState<string | null>(null);
    const [respiratoryRate, setRespiratoryRate] = useState<string | null>(null);
    const [perfusion, setPerfusion] = useState<string | null>(null);
    const [mentalStatus, setMentalStatus] = useState<string | null>(null);

    // States to indicate which question to display next based on user input
    const [showFirstBreathingQuestion, setShowFirstBreathingQuestion] = useState(false);
    const [showSecondBreathingQuestion, setShowSecondBreathingQuestion] = useState(false);
    const [showRespiratoryRateQuestion, setShowRespiratoryRateQuestion] = useState(false);
    const [showPerfusionQuestion, setShowPerfusionQuestion] = useState(false);
    const [showMentalStatusQuestion, setShowMentalStatusQuestion] = useState(false);
    
    // Other important variables
    const [activeTriage, setActiveTriage] = useState(false);
    const [isCreatingPatient, setIsCreatingPatient] = useState(false);
    const [image, setImage] = useState("");
    const randomBarcodeID = Math.floor(Math.random() * 9000) + 1000;
    const { create: createPatient } = useMutationPatient();
    const { currentUser, setCurrentUser } = useStore();
    

    // Hook contains useEffects required to generate decision tree
    useTriageLogic(
        ableToWalk,
        firstSpontaneousBreathing,
        secondSpontaneousBreathing,
        respiratoryRate,
        perfusion,
        setFirstSpontaneousBreathing,
        setSecondSpontaneousBreathing,
        setRespiratoryRate,
        setPerfusion,
        setMentalStatus,
        setShowFirstBreathingQuestion,
        setShowSecondBreathingQuestion,
        setShowRespiratoryRateQuestion,
        setShowPerfusionQuestion,
        setShowMentalStatusQuestion
    );
    
    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") return;
        const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        });
        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    // New state to hold the pending triage selection.
      const [pendingTriage, setPendingTriage] = useState<TriageStatus | null>(null);
    

     // Instead of immediately processing, store the selection.
      const handleTriage = (color: TriageStatus) => {
        setPendingTriage(color);
      };
    
      // Confirm submission function – sends the patient data.
      const confirmTriage = async () => {
        //TODO: is there a better way to do this bc currentUser has to be initialized to null but htere shouldn't be a way to get here without first initializing currentUser
        if (currentUser) {
          if (!pendingTriage) return;
          setIsCreatingPatient(true);

          const newPatientData: CreatePatientDTO = {
            barcodeID: randomBarcodeID.toString(),
            triageMemberID: currentUser._id,
            lastUpdated: new Date().toISOString(),
            patientStatus: "Triage Complete",
            triageStatus: pendingTriage,
            zone: currentUser.userZone,
          };
          console.log("userzone is", currentUser.userZone);
      
          const result = await createPatient(newPatientData);
          setIsCreatingPatient(false);
          if (result) {
            console.log("Patient created with ID:", result);
            resetTriage();
            // Optionally, reset all states after successful submission.
            setPendingTriage(null);
            router.push(`/patient-notes?barcodeID=${result.barcodeID}`)

          } else {
            console.log("Patient creation failed.");
          }
      }
      };
    
      // Reset function to clear all answers and states.
      const resetTriage = () => {
        setAbleToWalk(null);
        setFirstSpontaneousBreathing(null);
        setSecondSpontaneousBreathing(null);
        setRespiratoryRate(null);
        setPerfusion(null);
        setMentalStatus(null);
    
        setShowFirstBreathingQuestion(false);
        setShowSecondBreathingQuestion(false);
        setShowRespiratoryRateQuestion(false);
        setShowPerfusionQuestion(false);
        setShowMentalStatusQuestion(false);
    
        setActiveTriage(false);
        setPendingTriage(null);
      };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
              <IconSymbol
              size={310}
              color="#808080"
              name="cross.case.fill"
              style={styles.headerImage}
              />
          }
        >
        {/* INITIAL TRIAGE SCREEN */}
        {!activeTriage && (
            <View style={styles.fullWidthButton}>
            <Button
                onPress={() => {
                    openCamera();
                    setActiveTriage(true);
                }}
                title="Click to begin triage"
                variant="grey"
            />
            </View>
        )}

        {/* TRIAGE HAS BEGUN */}
        {activeTriage && (
            <View style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Triage Patient 1036</ThemedText>
            </ThemedView>

            {/* Triage Override Section */}
            <ThemedText type="subtitle" style={styles.overrideLabel}>
                Triage Override
            </ThemedText>
            {/* First row: Immediate (red), Delayed (yellow) */}
            <View style={styles.row}>
                <View style={styles.buttonContainer}>
                <Button
                    title="Immediate"
                    variant="immediate"
                    onPress={() => handleTriage("Immediate")}
                />
                </View>
                <View style={styles.buttonContainer}>
                <Button
                    title="Delayed"
                    variant="delayed"
                    onPress={() => handleTriage("Delayed")}
                />
                </View>
            </View>
            {/* Second row: Minor (green), Expectant (black) */}
            <View style={styles.row}>
                <View style={styles.buttonContainer}>
                <Button
                    title="Minor"
                    variant="minor"
                    onPress={() => handleTriage("Minor")}
                />
                </View>
                <View style={styles.buttonContainer}>
                <Button
                    title="Expectant"
                    variant="expectant"
                    onPress={() => handleTriage("Expectant")}
                />
                </View>
            </View>

            {/* DECISION TREE QUESTIONS*/}

            <Questions
                ableToWalk={ableToWalk}
                setAbleToWalk={setAbleToWalk}
                firstSpontaneousBreathing={firstSpontaneousBreathing}
                setFirstSpontaneousBreathing={setFirstSpontaneousBreathing}
                secondSpontaneousBreathing={secondSpontaneousBreathing}
                setSecondSpontaneousBreathing={setSecondSpontaneousBreathing}
                respiratoryRate={respiratoryRate}
                setRespiratoryRate={setRespiratoryRate}
                perfusion={perfusion}
                setPerfusion={setPerfusion}
                mentalStatus={mentalStatus}
                setMentalStatus={setMentalStatus}
                handleTriage={handleTriage}
                showFirstBreathingQuestion={showFirstBreathingQuestion}
                showSecondBreathingQuestion={showSecondBreathingQuestion}
                showRespiratoryRateQuestion={showRespiratoryRateQuestion}
                showPerfusionQuestion={showPerfusionQuestion}
                showMentalStatusQuestion={showMentalStatusQuestion}
            />

            {/* CONFIRMATION & RESET SECTION */}
                      {pendingTriage && (
                        <View style={styles.confirmSection}>
                          <ThemedText type="subtitle">
                            Your triage status is: {" "}
                            <ThemedText type="title">{pendingTriage}</ThemedText>
                          </ThemedText>
                          <Button title="Submit" variant="grey" onPress={confirmTriage} />
            
                        </View>
                      )}


            {/*<Button title="Reset" variant="grey" onPress={resetTriage} style={styles.resetButton} />*/}
            <TouchableOpacity onPress={resetTriage} style={styles.resetButton2}>
              <ThemedText type="defaultSemiBold">Start Over</ThemedText>
            </TouchableOpacity>
            {isCreatingPatient && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </View>
      )}
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
    marginVertical: 10,
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
  confirmSection: {
    marginTop: 20,
  },
  resetButton: {
    marginTop: 100,
    marginHorizontal: 10,
    backgroundColor: "#818181",
    textDecorationColor: "#ffffff"
  },
  resetButton2: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 11,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
