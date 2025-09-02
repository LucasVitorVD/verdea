"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Device } from "@/interfaces/device";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DeviceDetails from "./DeviceDetails";
import { Eye } from "lucide-react";

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
      <Sheet>
        <SheetTrigger className="text-primary cursor-pointer hover:underline">
          {row.original.name}
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Detalhes</SheetTitle>
          </SheetHeader>
          <DeviceDetails device={row.original} />
        </SheetContent>
      </Sheet>
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
      const formatted = format(date, "dd/MM/yyyy", { locale: ptBR });

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const device = row.original;

      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="cursor-pointer">
              <Eye />
              Ver detalhes
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Detalhes</SheetTitle>
            </SheetHeader>
            <DeviceDetails device={device} />
          </SheetContent>
        </Sheet>
      );
    },
  },
];
