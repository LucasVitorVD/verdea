import GardeningIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import EmptyState from "@/components/empty-state";
import PlantCard from "@/components/cards/PlantCard";
import AddPlantDialog from "@/components/dialogs/AddPlantDialog";

const plants = [
  {
    id: 1,
    name: "Samambaia",
    species: "Nephrolepis exaltata",
    image: "/placeholder.svg?height=200&width=200",
    moisture: 78,
    lastWatered: "Hoje, 08:00",
    status: "Saudável",
  },
];

export default function MyPlantsPage() {
  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-12 md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Suas Plantas</h1>
          <p className="text-muted-foreground">
            Monitore e cuide das suas plantas de forma inteligente.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <AddPlantDialog />
        </div>
      </div>

      {plants.length <= 0 && (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title="Nenhuma plantinha por aqui… ainda!"
            description="Adicione sua primeira planta e deixe que a Verdea cuide dela com
                todo carinho (e água, claro)."
            imgSrc={GardeningIllustration}
            imgAlt="Sem plantas"
          />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plants.length > 0 &&
          plants.map((plant, index) => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              species={plant.species}
              image={plant.image}
              moisture={plant.moisture}
              lastWatered={plant.lastWatered}
              status={plant.status}
            />
          ))}
      </div>
    </section>
  );
}
