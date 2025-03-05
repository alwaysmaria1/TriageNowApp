import { PatientIC, ColorScheme } from '@/components/lib/types';


// Define priority colors
export const priorityColors: Record<string, ColorScheme>= {
    IMMEDIATE: { bg: '#F8D7DA', text: '#DC3545', value: '#DC3545', badgebg: '#DC3545' },
    DELAYED: { bg: '#FFF3CD', text: '#856404', value: '#d48506', badgebg: '#f5d405' },
    MINOR: { bg: '#D4EDDA', text: '#28A745', value: '#28A745', badgebg: '#28A745' },
    EXPECTANT: { bg: '#E2E3E5', text: '#1B1E21', value: '#6C757D', badgebg: '#000000' },
};

// Mock data for demonstration
export const initialPatients: PatientIC[] = [
  { id: '10386', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10387', priority: 'DELAYED', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10388', priority: 'DELAYED', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10389', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '2', zoneLeader: 'Meghana Karthic' },
  { id: '10390', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10391', priority: 'EXPECTANT', status: 'Triage Complete', zone: '2', zoneLeader: 'Kamila Wong' },
  { id: '10392', priority: 'MINOR', status: 'Triage Complete', zone: '4', zoneLeader: 'Micaela Rodriguez Steube' },
];

// Mock data for zone
export const zoneStaff: Record<string, string []>= {
    'Zone 1': ['person1'],
    'Zone 2': ['person2','person3','person4'],
    'Zone 3': ['person5','person6'],
    'Zone 4': ['person7', 'person8', 'person9', 'person10'],
  };