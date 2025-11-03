"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { DashboardData } from "@/interfaces/dashboard";

export function SectionCards() {
  const { data: dashboardData } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/dashboard");

      return response.data as DashboardData;
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Plantas registradas</CardDescription>
          <CardTitle className="text-2xl font-semibold md:text-3xl">
            {dashboardData?.totalPlants ?? "0"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Monitorando o crescimento das plantas
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Dispositivos</CardDescription>
          <CardTitle className="text-2xl font-semibold md:text-3xl">
            {dashboardData?.totalDevices ?? "0"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            {dashboardData?.onlineDevices ?? "0"} online,{" "}
            {dashboardData?.offlineDevices ?? "0"} offline
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Última irrigação</CardDescription>
          <CardTitle className="text-2xl font-semibold md:text-3xl">
            {dashboardData?.lastIrrigation
              ? new Date(dashboardData.lastIrrigation.date).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "Sem registros"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            {dashboardData?.lastIrrigation
              ? `Irrigação da planta ${dashboardData.lastIrrigation.plantName}`
              : "Nenhuma irrigação registrada ainda"}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Umidade média do solo</CardDescription>
          <CardTitle className="text-2xl font-semibold md:text-3xl">
            {dashboardData
              ? `${dashboardData.averageSoilMoisture.toFixed(1)}%`
              : "0%"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Média calculada com base no histórico
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
