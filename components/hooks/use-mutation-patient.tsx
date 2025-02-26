import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { CreatePatientDTO, EditPatientDTO, Patient } from "../lib/types";
import { useStore } from "../lib/store";

export function useMutationPatient() {
  const createMutation = useMutation(api.patients.create);
  const updateMutation = useMutation(api.patients.update);
  const removeMutation = useMutation(api.patients.remove);
  const addPatient = useStore((state) => state.addPatient);

  const createPatient = async (
    patient: CreatePatientDTO
  ): Promise<Patient | null> => {

    try {
      const newPatient = await createMutation(patient);

      if (newPatient) {
        addPatient(newPatient);
      }

      alert(`Patient created successfully!\nTriage status: ${patient.triageStatus}`);
      return newPatient;

    } catch (error) {
      alert((error as Error).message || "Please try again later");
      return null;
    }
  };

  const updatePatient = async (
    patient: EditPatientDTO
  ): Promise<boolean> => {
    try {
      await updateMutation(patient);
      alert("Patient updated successfully!");
      return true;
    } catch (error) {
      alert((error as Error).message || "Please try again later");
      return false;
    }
  };

  const removePatient = async (barcodeID: string): Promise<boolean> => {
    try {
      await removeMutation({ barcodeID });
      alert("Patient removed successfully!");
      return true;
    } catch (error) {
      alert((error as Error).message || "Please try again later");
      return false;
    }
  };

  return {
    create: createPatient,
    update: updatePatient,
    remove: removePatient,
  };
}
