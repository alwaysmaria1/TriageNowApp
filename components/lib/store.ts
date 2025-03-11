import { Patient, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    patients: Patient[];
    currentTriageMember: User | null;
    setPatients: (patients: Patient[]) => void;
    setCurrentTriageMember: (user: User | null) => void;
}

type Action = {
    addPatient: (patient: Patient) => void;
}

const initialState: State = {
    patients: [],
    currentTriageMember: null,
    setPatients: () => {},
    setCurrentTriageMember: () => {},
}

export const useStore = create<State & Action>()(
    immer((set, get) => ({
        ...initialState,
  
        addPatient: (patient: Patient) => {
            set({ patients: [patient, ...get().patients] });
        },

        setPatients: (patients) => set({ patients }),

        setCurrentTriageMember: (user) => set({ currentTriageMember: user }),

    }))
);
