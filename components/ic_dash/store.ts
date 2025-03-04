import { Patient } from "./types";


type State = {
    patients: Patient[];
    setPatients: (patients: Patient[]) => void;
}

