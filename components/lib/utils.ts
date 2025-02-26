import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

// import { useTailwind } from 'nativewind';

export function cn(...inputs: ClassValue[]) {
// const { tailwind } = useTailwind();
// return twMerge(tailwind(clsx(inputs)))
    return twMerge(clsx(inputs))
}