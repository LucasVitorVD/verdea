import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCsrfToken() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

export function timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function translateWateringFrequency(freq: string) {
  const map: Record<string, string> = {
    "once_a_day": "1 vez ao dia", 
    "twice_a_day": "2 vezes ao dia", 
    "every_2_days": "A cada 2 dias",
    "weekly": "1 vez por semana"
  };

  return map[freq] || freq;
}