import { Device } from "./device"

type WateringFrequency = "once_a_day" | "twice_a_day" | "every_2_days" | "weekly"

interface Plant {
  id?: number
  name: string
  species: string
  location: string
  notes: string
  wateringTime: string
  wateringFrequency: WateringFrequency
  idealSoilMoisture: number
  imageUrl: string
  deviceSummary: Pick<Device, 'id' | 'name' | 'macAddress' | 'createdAt'>
}

export type { Plant }