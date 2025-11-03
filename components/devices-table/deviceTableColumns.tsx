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
import { Eye, BadgeCheckIcon, BadgeXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const deviceTableColumns: ColumnDef<Device>[] = [
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
    id: "isOnline",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isOnline ? "default" : "destructive"}>
        {row.original.isOnline ? <BadgeCheckIcon /> : <BadgeXIcon />}
        {row.original.isOnline ? "Online" : "Offline"}
      </Badge>
    ),
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
