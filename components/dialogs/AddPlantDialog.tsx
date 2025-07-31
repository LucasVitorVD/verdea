import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AddPlantForm from "../forms/AddPlantForm";

export default function AddPlantDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Droplet />
          Adicionar Planta
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh] min-w-4xl">
        <DialogHeader>
          <DialogTitle>Nova planta</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da sua nova planta para começar a monitorá-la.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações da Planta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <AddPlantForm />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline">Cancelar</Button>
              <Button type="submit" form="add-plant-form">
                <Droplet className="mr-2 h-4 w-4" />
                Adicionar Planta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
