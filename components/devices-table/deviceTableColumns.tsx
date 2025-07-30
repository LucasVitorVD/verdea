"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Device } from "@/interfaces/device";
import DeviceDetailsDialog from "./DeviceDetailsDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Actions from "./Actions";

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
        <Actions device={device} />
      );
    },
  },
];
