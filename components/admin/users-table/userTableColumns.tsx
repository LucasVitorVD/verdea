"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ellipsis } from "lucide-react";
import { User } from "@/interfaces/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import UserForm from "@/components/forms/UserForm";
import { useUsers } from "@/hooks/admin/useUsers";

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    id: "email",
    accessorFn: (row) => row.email,
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
    filterFn: "includesString",
  },
  {
    id: "role",
    header: "Função",
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
          {role === "ADMIN" ? "Admin" : "Usuário"}
        </Badge>
      );
    },
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
      const { deleteUser } = useUsers();
      const user = row.original;

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

                  <UserForm data={user} />
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive hover:cursor-pointer"
              onClick={() => deleteUser.mutate(user.id)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
