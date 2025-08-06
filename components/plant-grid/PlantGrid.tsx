import React from "react";
import PlantCard from "../cards/PlantCard";
import EmptyState from "../empty-state";
import GardeningIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { Plant } from "@/interfaces/plant";

interface Props {
  plants: Plant[];
}

export default function PlantGrid({ plants }: Props) {
  return (
    <>
      {plants && plants.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title="Nenhuma planta encontrada"
            description="Você ainda não adicionou nenhuma planta. Clique no botão abaixo para adicionar sua primeira planta."
            imgSrc={GardeningIllustration}
            imgAlt="Sem plantas"
          />
        </div>
      )}
    </>
  );
}
