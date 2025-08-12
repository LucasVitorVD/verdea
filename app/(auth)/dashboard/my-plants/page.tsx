import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import PlantGrid from "@/components/plant-grid/PlantGrid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PlantForm from "@/components/forms/PlantForm";

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
          <Dialog>
            <DialogTrigger asChild>
              <PulsatingButton pulseColor="rgba(110, 145, 123, 0.3)">
                <div className="flex items-center gap-2">
                  <Plus className="mr-px size-4" />
                  Adicionar Planta
                </div>
              </PulsatingButton>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-[90vh] lg:min-w-4xl">
              <DialogHeader>
                <DialogTitle>Nova planta</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da sua nova planta para começar a
                  monitorá-la.
                </DialogDescription>
              </DialogHeader>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Planta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PlantForm />
                  </CardContent>
                </Card>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" form="add-plant-form">
                  <Plus className="mr-px size-4" />
                  Adicionar Planta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <PlantGrid />
    </section>
  );
}
