import { Patient } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    patients: Patient[];
}

type Action = {
    addPatient: (patient: Patient) => void;
    setPatients: (patients: Patient[]) => void;
}

const initialState: State = {
    patients: [],
    // setPatients: () => {},
}

export const useStore = create<State & Action>()(
    immer((set, get) => ({
        ...initialState,
  
        addPatient: (patient: Patient) => {
            set({ patients: [patient, ...get().patients] });
        },

        setPatients: (patients) => set({ patients }),

    }))
);
