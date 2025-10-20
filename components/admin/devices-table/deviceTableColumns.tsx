"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Device } from "@/interfaces/device";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BadgeXIcon, Ellipsis, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDevices } from "@/hooks/useDevice";
import { useUsers } from "@/hooks/admin/useUsers";
import { useState } from "react";

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
    cell: ({ row }) => <div>{row.original.name}</div>,
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
      const [selectedUser, setSelectedUser] = useState<string | null>(null);
      const { deleteDevice, assignDevice } = useDevices(true);
      const { usersQuery } = useUsers();
      const device = row.original;

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        console.log(
          `Usuário ${selectedUser} vinculado ao dispositivo ${device.name}`
        );
        
        assignDevice.mutate({ email: selectedUser, macAddress: device.macAddress })
      };

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
                  Vincular usuário
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Vincular usuário ao dispositivo</SheetTitle>
                    <SheetDescription>
                      Selecione um usuário para atrelar ao dispositivo{" "}
                      {device.name}
                    </SheetDescription>
                  </SheetHeader>

                  <form
                    className="flex flex-col gap-4 px-4"
                    onSubmit={handleSubmit}
                  >
                    <RadioGroup
                      value={selectedUser ?? ""}
                      onValueChange={setSelectedUser}
                    >
                      {usersQuery.data &&
                        usersQuery.data.length > 0 &&
                        usersQuery.data.map((user) => (
                          <FieldLabel key={user.id} htmlFor={user.email}>
                            <Field orientation="horizontal">
                              <FieldContent>
                                <FieldTitle>
                                  <User className="size-4" />
                                  {user.email}
                                </FieldTitle>
                                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="mt-2">
                                  {user.role === "ADMIN" ? "Admin" : "Usuário"}
                                </Badge>
                              </FieldContent>
                              <RadioGroupItem value={user.email} id={user.email} />
                            </Field>
                          </FieldLabel>
                        ))}
                    </RadioGroup>

                    <Button type="submit">Confirmar</Button>
                  </form>
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive hover:cursor-pointer"
              onClick={() => deleteDevice.mutate(device.id!)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
