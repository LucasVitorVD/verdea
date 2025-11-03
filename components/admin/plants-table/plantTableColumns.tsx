"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Pen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Badge } from "@/components/ui/badge";
import { Plant } from "@/interfaces/plant";
import { translateSpecies } from "@/lib/utils";
import { usePlants } from "@/hooks/usePlants";
import PlantForm from "@/components/forms/PlantForm";
import { Button } from "@/button";

export const plantTableColumns: ColumnDef<Plant>[] = [
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: "Nome",
    cell: ({ row }) => <div>{row.original.name}</div>,
    filterFn: "includesString",
  },
  {
    id: "species",
    header: "Espécie",
    cell: ({ row }) => <div>{translateSpecies(row.original.species)}</div>,
  },
  {
    id: "location",
    header: "Local",
    cell: ({ row }) => <div>{row.original.location}</div>,
  },
  {
    id: "mode",
    header: "Modo",
    cell: ({ row }) => {
      const mode = row.original.mode;

      return (
        <Badge variant={mode === "AUTO" ? "default" : "secondary"}>
          {mode === "AUTO" ? "Automático" : "Programado"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { deletePlant } = usePlants(true);
      const plant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="text-sm pl-2 cursor-pointer">
                  Editar
                </DialogTrigger>
                <DialogContent className="overflow-y-auto max-h-[90vh] lg:min-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Editar planta</DialogTitle>
                    <DialogDescription>
                      Atualize os detalhes da planta conforme necessário.
                    </DialogDescription>
                  </DialogHeader>

                  <PlantForm data={plant} isAdmin />

                  <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose>
                      <Button type="submit" form="add-plant-form">
                        <Pen className="mr-px size-4" />
                        Editar Planta
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive hover:cursor-pointer"
              onClick={() => deletePlant.mutate(plant.id!)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
