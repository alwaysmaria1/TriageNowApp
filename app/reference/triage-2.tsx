import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton as Button } from '@/components/ThemedButton';
import * as ImagePicker from 'expo-image-picker';
import { completeTriage, DecisionTreeState } from '@/components/triage/triage-tree';
import { useMutationPatient } from '@/components/hooks/use-mutation-patient';
import { CreatePatientDTO, TriageStatus } from "@/components/lib/types";
// import styles from "@/components/lib/styles";

export default function TabThreeScreen() {
  // Decision tree state values
  const [ableToWalk, setAbleToWalk] = useState<boolean | null>(null);
  const [initialSpontaneousBreathing, setInitialSpontaneousBreathing] = useState<boolean | null>(null);
  const [secondSpontaneousBreathing, setSecondSpontaneousBreathing] = useState<boolean | null>(null);
  const [respiratoryRate, setRespiratoryRate] = useState<number | null>(null);
  const [perfusion, setPerfusion] = useState<boolean | null>(null);
  const [mentalStatus, setMentalStatus] = useState<boolean | null>(null);

  // State for showing each decision question
  const [showFirstBreathingQuestion, setShowFirstBreathingQuestion] = useState(false);
  const [showSecondBreathingQuestion, setShowSecondBreathingQuestion] = useState(false);
  const [showRespiratoryRateQuestion, setShowRespiratoryRateQuestion] = useState(false);
  const [showPerfusionQuestion, setShowPerfusionQuestion] = useState(false);
  const [showMentalStatusQuestion, setShowMentalStatusQuestion] = useState(false);

  const [activeTriage, setActiveTriage] = useState(false);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [image, setImage] = useState("");

  const randomBarcodeID = Math.floor(Math.random() * 9000) + 1000;

  const { create: createPatient } = useMutationPatient();

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

  //TODO: Missing unique barcode identifier
  //TODO: Missing changing page once a patient is created

  // Override function: immediately create the patient with the chosen color.
  const handleOverrideTriage = async (
    overrideColor: TriageStatus
  ) => {
    setIsCreatingPatient(true);
    const newPatientData: CreatePatientDTO = {
      barcodeID: randomBarcodeID.toString(), // Replace with your unique patient identifier.
      lastUpdated: new Date().toISOString(),
      patientStatus: "Triage Complete",
      triageStatus: overrideColor,
      zone: "Zone 3", // Adjust as needed.
    };

    const result = await createPatient(newPatientData); // Call hook to add patient to DB
    setIsCreatingPatient(false);

    if (result) {
      console.log("Patient created (override) with ID:", result);
    } else {
      console.log("Patient creation failed.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<></>}
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
                onPress={() => handleOverrideTriage("Immediate")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Delayed"
                variant="delayed"
                onPress={() => handleOverrideTriage("Delayed")}
              />
            </View>
          </View>
          {/* Second row: Minor (green), Expectant (black) */}
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button
                title="Minor"
                variant="minor"
                onPress={() => handleOverrideTriage("Minor")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Expectant"
                variant="expectant"
                onPress={() => handleOverrideTriage("Expectant")}
              />
            </View>
          </View>

          {/* Decision Tree Questions */}
          <ThemedText type="subtitle" style={styles.questionText}>
            Able to walk?
          </ThemedText>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  console.log("Able to walk: Yes");
                  setAbleToWalk(true);
                  // Directly override with green outcome.
                  handleOverrideTriage("Minor");
                }}
                title="Yes"
                variant="grey"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  console.log("Able to walk: No");
                  setAbleToWalk(false);
                  setShowFirstBreathingQuestion(true);
                }}
                title="No"
                variant="grey"
              />
            </View>
          </View>

          {showFirstBreathingQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Spontaneous breathing?
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Spontaneous breathing: Yes");
                      setInitialSpontaneousBreathing(true);
                      setShowRespiratoryRateQuestion(true);
                      // setShowSecondBreathingQuestion(false);
                    }}
                    title="Yes"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Spontaneous breathing: No");
                      setInitialSpontaneousBreathing(false);
                      setShowSecondBreathingQuestion(true);
                    }}
                    title="No"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showSecondBreathingQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                POSITION THE PATIENT'S AIRWAY
              </ThemedText>
              <ThemedText type="subtitle" style={styles.questionText}>
                Spontaneous breathing? (After reposition)
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Second spontaneous breathing: Yes");
                      setSecondSpontaneousBreathing(true);
                      setShowRespiratoryRateQuestion(true);
                    }}
                    title="Yes"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Second spontaneous breathing: No");
                      setSecondSpontaneousBreathing(false);
                      // If second check fails, outcome is black.
                      handleOverrideTriage("Expectant");
                    }}
                    title="No"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showRespiratoryRateQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Respiratory Rate
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Respiratory rate: >30");
                      setRespiratoryRate(35);
                      // Outcome red for high rate.
                      handleOverrideTriage("Immediate");
                    }}
                    title=">30"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Respiratory rate: <30");
                      setRespiratoryRate(25);
                      setShowPerfusionQuestion(true);
                    }}
                    title="<30"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showPerfusionQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Perfusion (Radial Pulse Present?)
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Perfusion: Present");
                      setPerfusion(true);
                      setShowMentalStatusQuestion(true);
                    }}
                    title="Present"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Perfusion: Absent");
                      setPerfusion(false);
                      // Outcome red when perfusion is absent.
                      handleOverrideTriage("Immediate");
                    }}
                    title="Absent"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

          {showMentalStatusQuestion && (
            <>
              <ThemedText type="subtitle" style={styles.questionText}>
                Mental Status (Obeys commands?)
              </ThemedText>
              <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Mental Status: Obeys commands");
                      setMentalStatus(true);
                      // Final outcome: yellow.
                      handleOverrideTriage("Delayed");
                    }}
                    title="Obeys commands"
                    variant="grey"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      console.log("Mental Status: Doesn't obey");
                      setMentalStatus(false);
                      // Final outcome: red.
                      handleOverrideTriage("Immediate");
                    }}
                    title="Doesn't obey commands"
                    variant="grey"
                  />
                </View>
              </View>
            </>
          )}

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
  questionText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullWidthButton: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
