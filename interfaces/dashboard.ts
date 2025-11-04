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

interface ProfileDashboard {
  totalPlants: number,
  totalDevices: number,
  totalIrrigationHistory: number,
  engagementLevel: number
}

export type { DashboardData, LastIrrigation, SoilMoisture, ProfileDashboard };