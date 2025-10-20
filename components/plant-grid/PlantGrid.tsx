"use client";

import React from "react";
import PlantCard from "../cards/PlantCard";
import EmptyState from "../empty-state";
import GardeningIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { usePlants } from "@/hooks/usePlants";

export default function PlantGrid() {
  const { plantsQuery } = usePlants(false)

  if (plantsQuery.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Carregando suas plantas...</p>
      </div>
    );
  }

  if (plantsQuery.data?.length === 0) {
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
      {plantsQuery.data && plantsQuery.data.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
