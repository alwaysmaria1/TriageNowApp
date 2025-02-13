import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
// import { useTailwind } from 'nativewind';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}