"use client";

import { Leaf, Zap, Droplet, Award } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { ProfileDashboard } from "@/interfaces/dashboard";
import EmptyState from "../empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";

export default function ActivityCard() {
  const { userQuery: profileData } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["user-profile", profileData.data?.id],
    enabled: !!profileData.data,
    queryFn: async () => {
      const response = await axiosInstance.get("/dashboard/profile");
      return response.data as ProfileDashboard;
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Atividade</CardTitle>
          <CardDescription>Veja como você tem usado o Verdea.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-6">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold">
                  {data?.totalPlants ?? 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Plantas cadastradas
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold">
                  {data?.totalDevices ?? 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Dispositivos conectados
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                  <Droplet className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold">
                  {data?.totalIrrigationHistory ?? 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Irrigações realizadas
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nível de Engajamento</CardTitle>
          <CardDescription>
            Baseado no seu uso da plataforma e cuidado com as plantas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data && data.engagementLevel !== undefined ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progresso atual</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(data.engagementLevel)}%
                </span>
              </div>
              <Progress value={data.engagementLevel} className="w-full" />
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="text-sm">
                  {data.engagementLevel >= 80
                    ? "Especialista em Plantas 🌟"
                    : data.engagementLevel >= 60
                    ? "Jardineiro Dedicado 🌱"
                    : data.engagementLevel >= 40
                    ? "Cuidador Iniciante 🌿"
                    : "Novo Membro 🌱"}
                </span>
              </div>
            </>
          ) : (
            <EmptyState
              title="Sem dados de engajamento"
              description="Parece que ainda não há atividade suficiente por aqui... Que tal regar umas plantinhas e subir de nível? 🌱✨"
              imgSrc={EmptyIllustration}
              imgAlt="Ilustração de estado vazio"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
