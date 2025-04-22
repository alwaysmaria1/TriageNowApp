import React from "react";
import { ThemedText } from "../ThemedText";
import Question from "./question";
import { TriageStatus } from "../lib/types";

interface QuestionsProps {
    ableToWalk: string | null;
    setAbleToWalk: React.Dispatch<React.SetStateAction<string | null>>;
    firstSpontaneousBreathing: string | null;
    setFirstSpontaneousBreathing: React.Dispatch<React.SetStateAction<string | null>>;
    secondSpontaneousBreathing: string | null;
    setSecondSpontaneousBreathing: React.Dispatch<React.SetStateAction<string | null>>;
    respiratoryRate: string | null;
    setRespiratoryRate: React.Dispatch<React.SetStateAction<string | null>>;
    perfusion: string | null;
    setPerfusion: React.Dispatch<React.SetStateAction<string | null>>;
    mentalStatus: string | null;
    setMentalStatus: React.Dispatch<React.SetStateAction<string | null>>;
    handleTriage: (category: TriageStatus) => void;
    showFirstBreathingQuestion: boolean;
    showSecondBreathingQuestion: boolean;
    showRespiratoryRateQuestion: boolean;
    showPerfusionQuestion: boolean;
    showMentalStatusQuestion: boolean;
    setTriageOverridden: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Questions({
    ableToWalk,
    setAbleToWalk,
    firstSpontaneousBreathing,
    setFirstSpontaneousBreathing,
    secondSpontaneousBreathing,
    setSecondSpontaneousBreathing,
    respiratoryRate,
    setRespiratoryRate,
    perfusion,
    setPerfusion,
    mentalStatus,
    setMentalStatus,
    handleTriage,
    showFirstBreathingQuestion,
    showSecondBreathingQuestion,
    showRespiratoryRateQuestion,
    showPerfusionQuestion,
    showMentalStatusQuestion,
    setTriageOverridden,
}: QuestionsProps) {
    const questions = [
    {
        show: true,
        questionText: "Able to Walk?",
        options: [
            { title: "Yes", value: "Yes", onPress: () => {
                handleTriage("Minor")
                setTriageOverridden(null)
            } },
            { title: "No", value: "No", onPress: () => {
                handleTriage(null)
                setTriageOverridden(null)
            } },
        ],
        stateKey: ableToWalk,
        setState: setAbleToWalk,
    },
    {
        show: showFirstBreathingQuestion,
        questionText: "Spontaneous Breathing?",
        options: [
            { title: "Yes", value: "Yes", onPress: () => handleTriage(null) },
            { title: "No", value: "No", onPress: () => handleTriage(null) },
        ],
        stateKey: firstSpontaneousBreathing,
        setState: setFirstSpontaneousBreathing,
    },
    {
        show: showSecondBreathingQuestion,
        specialText: "POSITION THE PATIENT'S AIRWAY",
        questionText: "Spontaneous Breathing?",
        options: [
            { title: "Yes", value: "Yes", onPress: () => handleTriage(null) },
            { title: "No", value: "No", onPress: () => handleTriage("Expectant") },
        ],
        stateKey: secondSpontaneousBreathing,
        setState: setSecondSpontaneousBreathing,
    },
    {
        show: showRespiratoryRateQuestion,
        questionText: "Respiratory Rate?",
        options: [
            { title: ">30", value: ">30", onPress: () => handleTriage("Immediate") },
            { title: "<30", value: "<30", onPress: () => handleTriage(null) },
        ],
        stateKey: respiratoryRate,
        setState: setRespiratoryRate,
    },
    {
        show: showPerfusionQuestion,
        questionText: `Perfusion\n(Radial Pulse?)`,
        options: [
            { title: "Present", value: "Present", onPress: () => handleTriage(null) },
            { title: "Absent", value: "Absent", onPress: () => handleTriage("Immediate") },
        ],
        stateKey: perfusion,
        setState: setPerfusion,
    },
    {
        show: showMentalStatusQuestion,
        questionText: `Mental Status\n(Obeys Commands?)`,
        options: [
            { title: "Yes", value: "Yes", onPress: () => handleTriage("Delayed") },
            { title: "No", value: "No", onPress: () => handleTriage("Immediate") },
        ],
        stateKey: mentalStatus,
        setState: setMentalStatus,
    },
  ];

  return (
    <>
        {questions.map(
            ({ show, specialText, questionText, options, stateKey, setState }, index) => show && (
                <React.Fragment key={index}>
                    {specialText && <ThemedText type="positionAirwayText">{specialText}</ThemedText>}
                    <Question questionText={questionText} options={options} stateKey={stateKey} setState={setState} />
                </React.Fragment>
            )
        )}
    </>
  );
}
