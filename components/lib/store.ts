import { current } from "immer";
import { Patient, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    patients: Patient[];
    users: User[];
    currentUser: User | null;
}

type Action = {
    addPatient: (patient: Patient) => void;
    setPatients: (patients: Patient[]) => void;
    addUser: (user: User) => void;
    setUsers: (users: User[]) => void;
    setCurrentUser: (user: User) => void; // Function to update user

}

const initialState: State = {
    patients: [],
    users: [],
    currentUser: null,
    // setPatients: () => {},
}

export const useStore = create<State & Action>()(
    immer((set, get) => ({
        ...initialState,
  
        addPatient: (patient: Patient) => {
            set({ patients: [patient, ...get().patients] });
        },

        setPatients: (patients) => set({ patients }),


        // TODO: double check this
        addUser: (user: User) => {
            set({ users: [user, ...get().users] });
        },

        setUsers: (users) => {set({ users })
        },
        
        setCurrentUser: (user: User) => {
            set({currentUser: user});
        },
    }))
);
