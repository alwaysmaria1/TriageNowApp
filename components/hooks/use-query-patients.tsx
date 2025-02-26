import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useStore } from "../lib/store";
import { useEffect } from "react";

export function useQueryPatients() {
  const patients = useStore((state) => state.patients);
  const setPatients = useStore((state) => state.setPatients);

  const fetchedPatients = useQuery(api.patients.getAll, {}); // Replace {} with filters

  useEffect(() => {
    if (fetchedPatients) {
      setPatients(fetchedPatients);
    }
  }, [fetchedPatients, setPatients]);

  return { patients };
}
