import { PlantSummary } from "./plant";

interface IrrigationRecord {
  id: number;
  soilMoisture: number;
  mode: "AUTO" | "SCHEDULED" | "PROGRAMADO";
  durationSeconds: number;
  createdAt: string;
  plant: PlantSummary;
  deviceName: string;
}

interface IrrigationPage {
  content: IrrigationRecord[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export type { IrrigationRecord, IrrigationPage };