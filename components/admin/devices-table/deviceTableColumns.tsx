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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    header: "Ações",
    cell: ({ row }) => {
      const [selectedUser, setSelectedUser] = useState<string | null>(null);
      const { deleteDevice, assignDevice, unassignDevice, resetWifi } =
        useDevices(true);
      const { usersQuery } = useUsers();
      const device = row.original;

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        assignDevice.mutate({
          email: selectedUser,
          macAddress: device.macAddress,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col items-start gap-2">
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
                      id="assign-user-form"
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
                                  <Badge
                                    variant={
                                      user.role === "ADMIN"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="mt-2"
                                  >
                                    {user.role === "ADMIN"
                                      ? "Admin"
                                      : "Usuário"}
                                  </Badge>
                                </FieldContent>
                                <RadioGroupItem
                                  value={user.email}
                                  id={user.email}
                                />
                              </Field>
                            </FieldLabel>
                          ))}
                      </RadioGroup>
                    </form>
                    <SheetFooter>
                      {selectedUser && (
                        <SheetClose asChild>
                          <Button type="submit" form="assign-user-form">
                            Salvar alterações
                          </Button>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Button variant="outline">Fechar</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger className="text-sm pl-2 hover:cursor-pointer">
                    Desvincular usuário
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja desvincular o usuário deste
                        dispositivo?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá desvincular o
                        usuário do dispositivo, remover suas plantas e suas
                        permissões de acesso.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => unassignDevice.mutate(device.id!)}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger className="text-sm pl-2 hover:cursor-pointer">
                    Resetar Wifi
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja resetar o Wifi deste dispositivo?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá resetar o Wifi
                        do dispositivo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => resetWifi.mutate(device.id!)}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger className="text-sm text-destructive pl-2 hover:cursor-pointer">
                  Excluir
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir este dispositivo?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá excluir
                      permanentemente o dispositivo e remover todos os dados
                      associados a ele.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteDevice.mutate(device.id!)}
                      className="bg-destructive text-white hover:bg-destructive/90"
                    >
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
