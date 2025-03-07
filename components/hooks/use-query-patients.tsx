import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useStore } from "../lib/store";
import { useEffect } from "react";
import { FindPatientsDTO } from "../lib/types";

export function useQueryPatients(sortField?: string, sortDirection?: 'asc' | 'desc') {
  const patients = useStore((state) => state.patients);
  const setPatients = useStore((state) => state.setPatients);

  const args: FindPatientsDTO = {
    sortField, 
    sortDirection, 
  };

  const fetchedPatients = useQuery(api.patients.getAll, args); // Replace {} with filters
  // console.log(fetchedPatients)
  const loadPatients = async () => {
    if (fetchedPatients) {
      setPatients(fetchedPatients);
    }
  }
  useEffect(() => {
    loadPatients();
  }, []);
  // }, [fetchedPatients, setPatients]);

  return { patients };
}

