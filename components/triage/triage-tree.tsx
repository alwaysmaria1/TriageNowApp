// triageHelper.ts

export type triageStatus = "green" | "yellow" | "red" | "black";

export interface DecisionTreeState {
  ableToWalk: boolean | null;
  initialSpontaneousBreathing: boolean | null;
  secondSpontaneousBreathing: boolean | null;
  respiratoryRate: number | null;
  perfusion: boolean | null;
  mentalStatus: boolean | null;
}

/**
 * Determines the triage color based on the decision tree state.
 */
export function gettriageStatus(state: DecisionTreeState): triageStatus {
  if (state.ableToWalk) {
    return "green";
  }

  // If not able to walk:
  if (state.initialSpontaneousBreathing) {
    // For yellow: resp rate < 30, perfusion present and mental status obeys commands.
    if (
      state.respiratoryRate !== null &&
      state.respiratoryRate < 30 &&
      state.perfusion &&
      state.mentalStatus
    ) {
      return "yellow";
    }
    return "red"; // Other responses are red.
  } else {
    // initialSpontaneousBreathing === false:
    if (state.secondSpontaneousBreathing === false) {
      return "black";
    } else {
      // secondSpontaneousBreathing === true; check additional parameters:
      if (state.respiratoryRate !== null) {
        if (state.respiratoryRate > 30) {
          return "red";
        }
        if (state.respiratoryRate < 30) {
          if (state.perfusion === false) {
            return "red";
          }
          if (state.perfusion && state.mentalStatus === false) {
            return "red";
          }
        }
      }
      return "red";
    }
  }
}

/**
 * Completes the triage process by computing the color and creating the patient.
 *
 * @param decision - The decision tree state gathered from the UI.
 * @param createPatient - The Convex mutation function for creating a patient.
 * @param barcodeID - Unique identifier for the patient.
 * @param zone - The zone information.
 * @returns The result of the createPatient mutation.
 */
export async function completeTriage(
  decision: DecisionTreeState,
  createPatient: (data: any) => Promise<any>,
  barcodeID: string,
  zone: string
) {
  const triageStatus = gettriageStatus(decision);
  const newPatientData = {
    barcodeID,
    lastUpdated: new Date().toISOString(),
    patientStatus: "Triage Complete",
    triageStatus: triageStatus,
    zone,
    // Include any other patient data as needed.
  };

  const result = await createPatient(newPatientData);
  return result;
}
