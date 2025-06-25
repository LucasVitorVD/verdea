"use client";

import { Leaf, Zap, Droplet, Calendar, Award } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useAuth } from "@/context/AuthContext";
import { differenceInDays } from "date-fns";
import { Progress } from "@/components/ui/progress";

export default function ActivityCard() {
  const { userQuery: profileData } = useAuth();
  
  const daysActive = differenceInDays(new Date(), new Date(profileData.data?.createdAt ?? new Date().toISOString()))

  // const engagementLevel = Math.min(100, profileData.totalIrrigations / 2 + profileData.daysActive * 1.5)
  const engagementLevel = Math.min(100, 4 / 2 + daysActive * 1.5);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Atividade</CardTitle>
          <CardDescription>
            Veja como você tem usado o PlantCare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">
                Plantas cadastradas
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">
                Dispositivos conectados
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                <Droplet className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold">4</div>
              <p className="text-sm text-muted-foreground">
                Irrigações realizadas
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold">
                {daysActive}
              </div>
              <p className="text-sm text-muted-foreground">{daysActive > 1 ? "Dias" : "Dia"} ativo</p>
            </div>
          </div>
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progresso atual</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(engagementLevel)}%
            </span>
          </div>
          <Progress value={engagementLevel} className="w-full" />
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="text-sm">
              {engagementLevel >= 80
                ? "Especialista em Plantas 🌟"
                : engagementLevel >= 60
                ? "Jardineiro Dedicado 🌱"
                : engagementLevel >= 40
                ? "Cuidador Iniciante 🌿"
                : "Novo Membro 🌱"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
