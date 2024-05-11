import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// A random ID generator.
export function generateId() {
	return Math.random().toString(32).slice(2, 6) + Date.now().toString(32).slice(4, 8);
}
