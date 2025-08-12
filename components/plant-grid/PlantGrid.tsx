"use client";

import React from "react";
import PlantCard from "../cards/PlantCard";
import EmptyState from "../empty-state";
import GardeningIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { Plant } from "@/interfaces/plant";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function PlantGrid() {
  const { data: plants = [], isLoading } = useQuery<Plant[]>({
    queryKey: ["getUserPlants"],
    queryFn: async () => {
      try {
        const request = await axiosInstance.get(
          process.env.NEXT_PUBLIC_API_URL + "/plant/all"
        );

        return request.data as Plant[];
      } catch (error) {
        toast.error(
          "Erro ao carregar suas plantas. Tente novamente mais tarde."
        );
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Carregando suas plantas...</p>
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          title="Nenhuma planta encontrada"
          description="Você ainda não adicionou nenhuma planta. Clique no botão abaixo para adicionar sua primeira planta."
          imgSrc={GardeningIllustration}
          imgAlt="Sem plantas"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
