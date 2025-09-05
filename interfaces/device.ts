import { Plant } from "./plant"

interface Device {
  id: number,
  name: string,
  macAddress: string,
  currentIp: string,
  createdAt: string,
  isOnline: string,
  plantSummary: Pick<Plant, 'id' | 'name' | 'species' | 'imageUrl'>
}

export type { Device }