import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

// import { useTailwind } from 'nativewind';

export function cn(...inputs: ClassValue[]) {
// const { tailwind } = useTailwind();
// return twMerge(tailwind(clsx(inputs)))
    return twMerge(clsx(inputs))
}

export const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Immediate': return '#FF6B6B';  // Red
      case 'Delayed': return '#FFD93D';    // Yellow
      case 'Minor': return '#6BCB77';      // Green
      case 'Expectant': return '#4A4A4A';  // Black
      default: return '#FFFFFF';
    }
  };