"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Device } from "@/interfaces/device";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import DeviceDetailsDialog from "../device-details-dialog/DeviceDetailsDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const deviceTableColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    id: "device-name",
    accessorFn: (row) => row.name,
    header: "Nome",
    cell: ({ row }) => (
      <DeviceDetailsDialog
        dialogTrigger={
          <div className="text-primary cursor-pointer hover:underline">
            {row.original.name}
          </div>
        }
        device={row.original}
      />
    ),
    filterFn: "includesString",
  },
  {
    id: "mac-address",
    header: "MAC",
    cell: ({ row }) => <div>{row.original.macAddress}</div>,
  },
  {
    id: "createdAt",
    header: "Registrado em",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formatted = format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const device = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => navigator.clipboard.writeText(device.macAddress)}
            >
              <Copy />
              Copiar endereço MAC
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Eye />
              Ver detalhes
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <SquarePen />
              Alterar informações
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer hover:underline">
              <Trash2 className="text-destructive" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
