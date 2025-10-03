import { Device } from "./device"

type WateringFrequency = "once_a_day" | "twice_a_day" | "every_2_days" | "weekly"

type Mode = "AUTO" | "SCHEDULED"

interface Plant {
  id?: number
  name: string
  species: string
  location: string
  notes: string
  mode: Mode
  wateringTimes: string[]
  wateringFrequency: WateringFrequency
  idealSoilMoisture: number
  imageUrl: string
  deviceSummary: Pick<Device, 'id' | 'name' | 'macAddress' | 'createdAt'>
}

export type { Plant }