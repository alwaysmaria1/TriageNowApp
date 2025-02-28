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
import { useEffect } from "react";
// import styles from "@/components/lib/styles";

export default function TabThreeScreen() {
    // States to capture user input and determine which question to display next based on user input
    const [ableToWalk, setAbleToWalk] = useState<boolean | null>(null);
    const [showFirstBreathingQuestion, setShowFirstBreathingQuestion] = useState(false);
    const [firstSpontaneousBreathing, setFirstSpontaneousBreathing] = useState<boolean | null>(null);
    const [showRespiratoryRateQuestion, setShowRespiratoryRateQuestion] = useState(false);
    const [respiratoryRate, setRespiratoryRate] = useState<string | null>(null);
    const [perfusion, setPerfusion] = useState<string | null>(null);
    
    const [showPerfusionQuestion, setShowPerfusionQuestion] = useState(false);
    const [showMentalStatusQuestion, setShowMentalStatusQuestion] = useState(false);
    const [mentalStatus, setMentalStatus] = useState<string | null>(null);

    const [secondSpontaneousBreathing, setSecondSpontaneousBreathing] = useState<boolean | null>(null);
    const [showSecondBreathingQuestion, setShowSecondBreathingQuestion] = useState(false);

    // Other important variables
    const [activeTriage, setActiveTriage] = useState(false);
    const [isCreatingPatient, setIsCreatingPatient] = useState(false);
    const [image, setImage] = useState("");
    const randomBarcodeID = Math.floor(Math.random() * 9000) + 1000;
    const { create: createPatient } = useMutationPatient();

    // useEffects to manage which questions display to user, even if the user changes their answer to earlier questions
    useEffect(() => {
        if (ableToWalk === true) {
            // Hide remaining questions that could have appeared on the screen 
            setShowFirstBreathingQuestion(false);
            setFirstSpontaneousBreathing(null);
            setShowSecondBreathingQuestion(false);
            setSecondSpontaneousBreathing(null);
            setShowRespiratoryRateQuestion(false);
            setRespiratoryRate(null);
            setShowPerfusionQuestion(false);
            setPerfusion(null);
            setShowMentalStatusQuestion(false);
            setMentalStatus(null);
        } else if (ableToWalk === false) {
            setShowFirstBreathingQuestion(true);
            setFirstSpontaneousBreathing(null);
            setShowRespiratoryRateQuestion(false);
        }
    }, [ableToWalk]);

    useEffect(() => {
        if (firstSpontaneousBreathing === true) {
            setShowRespiratoryRateQuestion(true);
            // If the user previously selected "No," the second breathing question was displayed, so we need to hide it
            setShowSecondBreathingQuestion(false);
            setSecondSpontaneousBreathing(null);
        } else if (firstSpontaneousBreathing === false) {
            setShowSecondBreathingQuestion(true);
            // Hide remaining questions that could have appeared on the screen
            setShowRespiratoryRateQuestion(false);
            setRespiratoryRate(null);
            setShowPerfusionQuestion(false);
            setPerfusion(null);
            setShowMentalStatusQuestion(false);
            setMentalStatus(null);
        }
    }, [firstSpontaneousBreathing]);

    useEffect(() => {
        if (secondSpontaneousBreathing === true) {
          setShowRespiratoryRateQuestion(true);
        } else if (secondSpontaneousBreathing === false) { // EXPECTANT
            // Hide remaining questions that could have appeared on the screen
            setShowRespiratoryRateQuestion(false);
            setRespiratoryRate(null);
            setShowPerfusionQuestion(false);
            setPerfusion(null);
            setShowMentalStatusQuestion(false);
            setMentalStatus(null);
        }
    }, [secondSpontaneousBreathing]);

    useEffect(() => {
        if (respiratoryRate === "<30") {
          setShowPerfusionQuestion(true);
        } else if (respiratoryRate === ">30") { // IMMEDIATE
          setShowPerfusionQuestion(false);
          setPerfusion(null);
          setShowMentalStatusQuestion(false);
          setMentalStatus(null);
        }
    }, [respiratoryRate]);

    useEffect(() => {
        if (perfusion === "Present") {
          setShowMentalStatusQuestion(true);
        } else if (perfusion === "Absent") { // IMMEDIATE
            setShowMentalStatusQuestion(false);
            setMentalStatus(null);
        }
    }, [perfusion]);
    
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

    // Change function name to handleTriage
    const handleOverrideTriage = async (
        overrideColor: TriageStatus
    ) => {
        setIsCreatingPatient(true);
        const newPatientData: CreatePatientDTO = {
        barcodeID: randomBarcodeID.toString(),
        lastUpdated: new Date().toISOString(),
        patientStatus: "Triage Complete",
        triageStatus: overrideColor,
        zone: "Zone 3",
        };

        // Add patient to database by calling 'createPatient' hook
        const result = await createPatient(newPatientData);
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
                Able to Walk?
            </ThemedText>
            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            console.log("Able to walk: Yes");
                            setAbleToWalk(true);
                            handleOverrideTriage("Minor"); // Patient is "Minor"
                        }}
                        title="Yes"
                        variant={ableToWalk === true ? "default" : "grey" }
                     />
                 </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            console.log("Able to walk: No");
                            setAbleToWalk(false);
                        }}
                        title="No"
                        variant={ableToWalk === false ? "default" : "grey" }
                        />
                </View>
            </View>

            {showFirstBreathingQuestion && (
                <>
                    <ThemedText type="subtitle" style={styles.questionText}>
                        Spontaneous Breathing?
                    </ThemedText>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Spontaneous breathing: Yes");
                                setFirstSpontaneousBreathing(true);
                            }}
                            title="Yes"
                            variant={firstSpontaneousBreathing === true ? "default" : "grey" }
                        />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Spontaneous breathing: No");
                                setFirstSpontaneousBreathing(false);
                            }}
                            title="No"
                            variant={firstSpontaneousBreathing === false ? "default" : "grey" }
                        />
                        </View>
                    </View>
                </>
            )}

            {showSecondBreathingQuestion && (
                <>
                    <ThemedText type="subtitle" style={styles.questionText2}>
                        POSITION THE PATIENT'S AIRWAY
                    </ThemedText>
                    <ThemedText type="subtitle" style={styles.questionText}>
                        Spontaneous Breathing?
                    </ThemedText>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Spontaneous breathing: Yes");
                                setSecondSpontaneousBreathing(true);
                            }}
                            title="Yes"
                            variant={secondSpontaneousBreathing === true ? "default" : "grey" }
                        />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Spontaneous breathing: No");
                                setSecondSpontaneousBreathing(false);
                                handleOverrideTriage("Expectant"); // Patient is "Expectant"
                            }}
                            title="No"
                            variant={secondSpontaneousBreathing === false ? "default" : "grey" }
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
                                setRespiratoryRate(">30");
                                handleOverrideTriage("Immediate"); // Patient is "Immediate"
                            }}
                            title=">30"
                            variant={respiratoryRate === ">30" ? "default" : "grey" }
                        />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Respiratory rate: <30");
                                setRespiratoryRate("<30");
                            }}
                            title="<30"
                            variant={respiratoryRate === "<30" ? "default" : "grey" }
                        />
                        </View>
                    </View>
                </>
            )}

            {showPerfusionQuestion && (
                <>
                    <ThemedText type="subtitle" style={styles.questionText}>
                        Perfusion{"\n"}(Radial Pulse?)
                    </ThemedText>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Present");
                                setPerfusion("Present");
                            }}
                            title="Present"
                            variant={perfusion === "Present" ? "default" : "grey" }
                        />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Absent");
                                setPerfusion("Absent");
                                handleOverrideTriage("Immediate"); // Patient is "Immediate"
                            }}
                            title="Absent"
                            variant={perfusion === "Absent" ? "default" : "grey" }
                        />
                        </View>
                    </View>
                </>
            )}

            {showMentalStatusQuestion && (
                <>
                    <ThemedText type="subtitle" style={styles.questionText}>
                        Mental Status{"\n"}(Obeys Commands?)
                    </ThemedText>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Obeys");
                                setMentalStatus("Obeys");
                                handleOverrideTriage("Delayed"); // Patient is "Immediate"
                            }}
                            title="Obeys"
                            variant={mentalStatus === "Obeys" ? "default" : "grey" }
                        />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                console.log("Fails to obey");
                                setMentalStatus("Fails to obey");
                                handleOverrideTriage("Immediate"); // Patient is "Immediate"
                            }}
                            title="Fails to obey"
                            variant={mentalStatus === "Fails to obey" ? "default" : "grey" }
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
  questionText2: {
    textAlign: 'center',
    marginVertical: 40,
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "#D3D3D3", // Light grey
  },
  defaultButton: {
    backgroundColor: "#D3D3D3", // Light grey
  },
  selectedButton: {
    backgroundColor: "#A9A9A9", // Darker grey
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
    // alignItems: "stretch"
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
});
