import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function usePatientByBarcode(barcodeID: string) {
  const patient = useQuery(api.patients.getOne, { barcodeID });

  return {
    patient
  }
}