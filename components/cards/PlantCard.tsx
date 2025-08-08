import {
  Droplet,
  Thermometer,
  Cog,
  Pen,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Plant } from "@/interfaces/plant";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import AddPlantForm from "../forms/AddPlantForm";
import { PlantFormSchema } from "@/zod-schemas/form/plant";
import PlantPlaceHolder from "@/public/images/plant-placeholder.jpg"

interface Props {
  plant: Plant;
}

export default function PlantCard({ plant }: Props) {
  return (
    <Card className="lg:w-96 overflow-hidden py-0 shadow-md transition-all hover:shadow-lg hover:translate-y-[-2px]">
      <CardHeader className="p-0">
        <figure className="w-full h-48">
          <Image
            src={plant.imageUrl || PlantPlaceHolder}
            alt={plant.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </figure>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-2xl font-semibold">{plant.name}</p>
          <p className="text-sm text-muted-foreground">{plant.species}</p>
        </div>

        {/* Display plant details from MQTT*/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-1">
              <Droplet className="size-4 text-blue-500" />
              <p>Umidade</p>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={33} />
              <p>%33</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Thermometer className="size-4 text-orange-500" />
              <p>Última irrigação</p>
            </div>
            <div>
              <p>Hoje, 08:00</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-4 pb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <Pen /> Editar
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto max-h-[90vh] lg:min-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar planta</DialogTitle>
              <DialogDescription>
                Modifique os detalhes da sua planta.
              </DialogDescription>
            </DialogHeader>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Planta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AddPlantForm
                    data={
                      {
                        ...plant,
                        device: plant.device.macAddress,
                      } as PlantFormSchema
                    }
                  />
                </CardContent>
              </Card>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" form="add-plant-form">
                <Pen className="mr-px size-4" />
                Editar Planta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="default" className="cursor-pointer">
          <Droplet className="text-secondary" /> Irrigar agora
        </Button>
      </CardFooter>
    </Card>
  );
}
