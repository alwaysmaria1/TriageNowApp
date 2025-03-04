// create patient type
export interface Patient {
    id: string;
    priority: string;
    status: string;
    zone: string;
    zoneLeader: string;
    [key: string]: string; // Allow dynamic access for sorting 
  }

export  interface ColorScheme {
    bg: string;
    text: string;
    value: string;
  }
  