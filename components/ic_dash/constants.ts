import { Patient, ColorScheme } from '@/components/ic_dash/types';


// Define priority colors
export const priorityColors: Record<string, ColorScheme>= {
    IMMEDIATE: { bg: '#F8D7DA', text: '#DC3545', value: '#DC3545' },
    DELAYED: { bg: '#FFF3CD', text: '#634b02', value: '#FFDC00' },
    MINOR: { bg: '#D4EDDA', text: '#28A745', value: '#28A745' },
    EXPECTANT: { bg: '#E2E3E5', text: '#1B1E21', value: '#6C757D' },
};

// Mock data for demonstration
export const initialPatients: Patient[] = [
  { id: '10386', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10387', priority: 'DELAYED', status: 'Triage Complete', zone: '3', zoneLeader: 'Kamila Wong' },
  { id: '10388', priority: 'DELAYED', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10389', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '2', zoneLeader: 'Meghana Karthic' },
  { id: '10390', priority: 'IMMEDIATE', status: 'Triage Complete', zone: '1', zoneLeader: 'Maria Herne' },
  { id: '10391', priority: 'EXPECTANT', status: 'Triage Complete', zone: '2', zoneLeader: 'Kamila Wong' },
];
