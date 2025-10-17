"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userTableColumns } from "./userTableColumns";
import { DataTable } from "@/components/data-table/index";
import { BadgePlus, Search } from "lucide-react";
import EmptyState from "@/components/empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { useUsers } from "@/hooks/admin/useUsers";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import UserForm from "@/components/forms/UserForm";

export default function UsersTable() {
  const { usersQuery } = useUsers();
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "email", value: "" },
  ]);

  const table = useReactTable({
    data: usersQuery.data ?? [],
    columns: userTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: -1,
    state: {
      columnFilters,
    },
  });

  if (usersQuery.data?.length === 0) {
    return (
      <EmptyState
        title="Nenhum usuário encontrado… por enquanto!"
        description="Adicione seu primeiro usuário e acompanhe tudo com a ajuda da Verdea, em tempo real."
        imgSrc={EmptyIllustration}
        imgAlt="Ilustração de usuário não encontrado"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Usuários</CardTitle>
        <CardDescription>
          Visualize e gerencie todos os usuários do sistema
        </CardDescription>
        <CardAction>
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "default" })}>
              <BadgePlus />
              Criar usuário
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Criar novo usuário</SheetTitle>
                <SheetDescription>
                  Crie uma nova conta de usuário no sistema. O novo usuário
                  poderá acessar conforme a permissão definida.
                </SheetDescription>
              </SheetHeader>

              <UserForm />
            </SheetContent>
          </Sheet>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable.Root>
          <DataTable.Filters>
            <div className="flex items-center gap-2 border rounded-sm pl-2">
              <Search className="size-5 text-muted-foreground" />
              <Input
                placeholder="Filtrar por email..."
                value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm border-none focus-visible:ring-0"
              />
            </div>
          </DataTable.Filters>
          <DataTable.Table
            table={table}
            columns={userTableColumns}
            isLoading={false}
          />

          <div className="text-muted-foreground flex-1 text-sm mt-2">
            <p>Total: {usersQuery.data?.length}</p>
          </div>
          {/* <DataTable.Pagination>
            <DataTable.PaginationAction
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev - 1)}
            >
              Anterior
            </DataTable.PaginationAction>
            <DataTable.PaginationAction
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Próximo
            </DataTable.PaginationAction>
          </DataTable.Pagination> */}
        </DataTable.Root>
      </CardContent>
    </Card>
  );
}
