import { Patient, ColorScheme } from '@/components/lib/types';
import { Id } from "convex/_generated/dataModel";


// Define triageStatus colors
export const triageStatusColors: Record<string, ColorScheme>= {
    Immediate: { bg: '#F8D7DA', text: '#DC3545', value: '#DC3545', badgebg: '#DC3545' },
    DELAYED: { bg: '#FFF3CD', text: '#856404', value: '#d48506', badgebg: '#f5d405' },
    MINOR: { bg: '#D4EDDA', text: '#28A745', value: '#28A745', badgebg: '#28A745' },
    EXPECTANT: { bg: '#E2E3E5', text: '#1B1E21', value: '#6C757D', badgebg: '#000000' },
};

// Mock data of Patient (to replace PatientIC) for demonstration
const patientId: Id<"patients"> = "patient10294" as Id<"patients">;
const numberOfPatients = 10;
const startNumber = 10294;
const patientIds: Id<"patients">[] = Array.from({ length: numberOfPatients }, (_, i) => 
  `patients${startNumber + i}` as Id<"patients">
);
export const initialPatients: Patient[] = [
  {_id: patientIds[0], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10294", lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Immediate", zone: '3' },
  {_id: patientIds[1], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10295", lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Delayed", zone: '3'},
  {_id: patientIds[2], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10296", lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Delayed", zone: '1'},
  {_id: patientIds[3], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10297",  lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Immediate", zone: '2'},
  {_id: patientIds[4], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10297",lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Immediate", zone: '1'},
  {_id: patientIds[5], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10297",lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Expectant", zone: '2'},
  {_id: patientIds[6], _creationTime: new Date(Date.now() - Math.random()).getTime(), barcodeID: "10297",lastUpdated: '2pm', patientStatus: 'Triage Complete', triageStatus: "Minor", zone: '4'},
];

// Mock data for zone
export const zoneStaff: Record<string, string []>= {
    'Zone 1': ['person1'],
    'Zone 2': ['person2','person3','person4'],
    'Zone 3': ['person5','person6'],
    'Zone 4': ['person7', 'person8', 'person9', 'person10'],
  };