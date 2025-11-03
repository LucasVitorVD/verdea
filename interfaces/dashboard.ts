interface LastIrrigation {
  plantName: string,
  date: Date,
  soilMoisture: number
}

interface DashboardData {
  totalPlants: number,
  totalDevices: number,
  onlineDevices: number,
  offlineDevices: number,
  lastIrrigation: LastIrrigation,
  averageSoilMoisture: number
}

interface SoilMoisture {
  date: Date,
  averageMoisture: number
}

export type { DashboardData, LastIrrigation, SoilMoisture };