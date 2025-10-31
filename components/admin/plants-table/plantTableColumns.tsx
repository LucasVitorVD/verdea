"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plant } from "@/interfaces/plant";
import { translateSpecies } from "@/lib/utils";
import { usePlants } from "@/hooks/usePlants";
import PlantForm from "@/components/forms/PlantForm";

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
      const mode = row.original.mode

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
              <Sheet>
                <SheetTrigger className="text-sm pl-2 hover:cursor-pointer">
                  Editar
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Editar usuário</SheetTitle>
                    <SheetDescription>
                      Atualize as informações deste usuário. As alterações serão
                      aplicadas imediatamente e poderão afetar suas permissões
                      de acesso.
                    </SheetDescription>
                  </SheetHeader>

                  <PlantForm data={plant} />
                </SheetContent>
              </Sheet>
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
