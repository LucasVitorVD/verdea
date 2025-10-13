"use client";

import {
  Droplet,
  Pen,
  Edit,
  Info,
  Settings,
  Trash2,
  Leaf,
  Sprout,
  MapPin,
  CalendarClock,
  Clock,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import PlantPlaceHolder from "@/public/images/plant-placeholder.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import PlantForm from "../forms/PlantForm";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { translateSpecies, translateWateringFrequency } from "@/lib/utils";

interface Props {
  plant: Plant;
}

export default function PlantCard({ plant }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deletePlantMutation = useMutation({
    mutationFn: async (plantId: number) => {
      return axiosInstance.delete(
        process.env.NEXT_PUBLIC_API_URL + `/plant/delete/${plantId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserPlants"] });
      toast.success("Planta excluída!");
    },
    onError: () => {
      toast.error("Não foi possível excluir a planta!");
    },
    retry: 2,
  });

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
              <p className="text-sm">Umidade (Gatilho)</p>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={plant.idealSoilMoisture} />
              <p>%{plant.idealSoilMoisture}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-4 pb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Info className="h-4 w-4" />
              Ver Detalhes
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Detalhes</SheetTitle>
            </SheetHeader>

            <Separator />

            <div className="flex items-center gap-4 px-4">
              <figure className="size-16">
                <Image
                  src={plant.imageUrl || PlantPlaceHolder}
                  alt={plant.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </figure>
              <div>
                <p>{plant.name}</p>
                <p className="text-muted-foreground">{translateSpecies(plant.species)}</p>
              </div>
            </div>

            <Separator />

            <div className="mt-4 space-y-6">
              <div className="px-4">
                <h3 className="text-lg font-semibold mb-3">
                  Informações da Planta
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Leaf className="h-4 w-4 text-muted-foreground" />
                      <span>Nome: {plant.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Sprout className="h-4 w-4 text-muted-foreground" />
                      <span>Tipo/Espécie: {translateSpecies(plant.species)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Localização: {plant.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 px-4">
                <h3 className="text-lg font-semibold mb-3">
                  Configurações de Irrigação
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Modo:{" "}
                    <Badge variant="outline">
                      {plant.mode === "AUTO" ? "Automático" : "Programado"}
                    </Badge>
                  </span>
                </div>

                {plant.mode === "SCHEDULED" && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      <span>Frequência: {translateWateringFrequency(plant.wateringFrequency)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Horários: {plant.wateringTimes.join(", ")}</span>
                    </div>
                  </>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4" />
                      <span className="text-sm">Umidade (Gatilho)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${plant.idealSoilMoisture}%` }}
                        />
                      </div>
                      <span className="font-medium">
                        {plant.idealSoilMoisture}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2 px-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 cursor-pointer">
                      <Edit />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto max-h-[90vh] lg:min-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Editar planta</DialogTitle>
                      <DialogDescription>
                        Edite os detalhes da sua planta.
                      </DialogDescription>
                    </DialogHeader>

                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Informações da Planta</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <PlantForm
                            data={plant}
                            onSuccess={() => setOpen(false)}
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

                <Dialog>
                  <DialogTrigger className="flex-1 cursor-pointer" asChild>
                    <Button variant="destructive">
                      <Trash2 />
                      Excluir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Você tem certeza?</DialogTitle>
                      <DialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá
                        permanentemente a planta e removerá seus dados.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Fechar</Button>
                      </DialogClose>
                      <DialogClose
                        onClick={() => deletePlantMutation.mutate(plant.id!)}
                        asChild
                      >
                        <Button
                          variant="destructive"
                          className="cursor-pointer"
                        >
                          Excluir
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button variant="default" className="cursor-pointer">
          <Droplet className="text-secondary" /> Irrigar agora
        </Button>
      </CardFooter>
    </Card>
  );
}
