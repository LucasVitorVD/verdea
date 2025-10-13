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

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString); 

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export function translateWateringFrequency(freq: string) {
  const map: Record<string, string> = {
    "once_a_day": "1 vez ao dia",
    "twice_a_day": "2 vezes ao dia",
    "every_2_days": "A cada 2 dias",
    "weekly": "1 vez por semana"
  };

  return map[freq] || freq;
}

export function translateSpecies(value: string): string {
  const speciesMap: Record<string, string> = {
    nephrolepis: "Samambaia",
    echeveria: "Suculenta",
    phalaenopsis: "Orquídea",
    ficus: "Ficus",
    monstera: "Costela de Adão",
    sansevieria: "Espada de São Jorge",
    other: "Outra",
  }

  return speciesMap[value] || "Desconhecida"
}