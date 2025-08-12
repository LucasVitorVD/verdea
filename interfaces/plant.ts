import { Device } from "./device"

interface Plant {
  id?: number
  name: string
  species: string
  location: string
  notes: string
  wateringTime: string
  wateringFrequency: number
  idealSoilMoisture: number
  imageUrl: string
  device: Device
}

export type { Plant }