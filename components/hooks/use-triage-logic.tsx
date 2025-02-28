import { useEffect, useState } from "react";

export function useTriageLogic(
    ableToWalk: string | null,
    firstSpontaneousBreathing: string | null,
    secondSpontaneousBreathing: string | null,
    respiratoryRate: string | null,
    perfusion: string | null,
    setFirstSpontaneousBreathing: (value: string | null) => void,
    setSecondSpontaneousBreathing: (value: string | null) => void,
    setRespiratoryRate: (value: string | null) => void,
    setPerfusion: (value: string | null) => void,
    setMentalStatus: (value: string | null) => void,
    setShowFirstBreathingQuestion: (value: boolean) => void,
    setShowSecondBreathingQuestion: (value: boolean) => void,
    setShowRespiratoryRateQuestion: (value: boolean) => void,
    setShowPerfusionQuestion: (value: boolean) => void,
    setShowMentalStatusQuestion: (value: boolean) => void
) {
  useEffect(() => {
    if (ableToWalk === "Yes") {
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
    } else if (ableToWalk === "No") {
        setShowFirstBreathingQuestion(true);
        setFirstSpontaneousBreathing(null);
        setShowRespiratoryRateQuestion(false);
    }
  }, [ableToWalk]);

  useEffect(() => {
    if (firstSpontaneousBreathing === "Yes") {
        setShowRespiratoryRateQuestion(true);
        setShowSecondBreathingQuestion(false);
        setSecondSpontaneousBreathing(null);
    } else if (firstSpontaneousBreathing === "No") {
        setShowSecondBreathingQuestion(true);
        setShowRespiratoryRateQuestion(false);
        setRespiratoryRate(null);
        setShowPerfusionQuestion(false);
        setPerfusion(null);
        setShowMentalStatusQuestion(false);
        setMentalStatus(null);
    }
  }, [firstSpontaneousBreathing]);

  useEffect(() => {
    if (secondSpontaneousBreathing === "Yes") {
        setShowRespiratoryRateQuestion(true);
    } else if (secondSpontaneousBreathing === "No") {
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
    } else if (respiratoryRate === ">30") {
        setShowPerfusionQuestion(false);
        setPerfusion(null);
        setShowMentalStatusQuestion(false);
        setMentalStatus(null);
    }
  }, [respiratoryRate]);

  useEffect(() => {
    if (perfusion === "Present") {
        setShowMentalStatusQuestion(true);
    } else if (perfusion === "Absent") {
        setShowMentalStatusQuestion(false);
        setMentalStatus(null);
    }
  }, [perfusion]);
}
