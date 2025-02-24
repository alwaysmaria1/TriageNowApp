import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function useQueryPatient() {
  // Get all patients
  const patients = useQuery(api.patients.getAll, {});

  return {
    patients,
  };
}