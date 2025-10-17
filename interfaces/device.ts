import { Plant } from "./plant"
import { User } from "./user"

interface Device {
  id: number,
  name: string,
  macAddress: string,
  currentIp: string,
  createdAt: string,
  isOnline: string,
  plantSummary: Pick<Plant, 'id' | 'name' | 'species' | 'imageUrl' | 'mode'>
}

interface DeviceAvailable {
  id: number,
  name: string,
  macAddress: string,
  currentIp: string,
  user: User
}

export type { Device, DeviceAvailable }