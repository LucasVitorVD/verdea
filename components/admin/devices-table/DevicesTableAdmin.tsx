"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deviceTableColumns } from "./deviceTableColumns";
import { DataTable } from "@/components/data-table/index";
import { Search } from "lucide-react";
import EmptyState from "@/components/empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { useDevices } from "@/hooks/admin/useDevice";

export default function DevicesTableAdmin() {
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "signed" },
  ]);
  const { devicesQuery } = useDevices();

  const table = useReactTable({
    data: devicesQuery.data ?? [],
    columns: deviceTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: -1,
    state: {
      columnFilters,
    },
  });

  if (devicesQuery.data?.length === 0) {
    return (
      <EmptyState
        title="Nenhum dispositivo encontrado… por enquanto!"
        description="Adicione seu primeiro dispositivo e acompanhe tudo com a ajuda da Verdea, em tempo real."
        imgSrc={EmptyIllustration}
        imgAlt="Ilustração de dispositivo não encontrado"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Dispositivos</CardTitle>
        <CardDescription>
          Visualize e gerencie todos os dispositivos do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable.Root>
          <DataTable.Filters>
            <div className="flex items-center gap-2 border rounded-sm pl-2">
              <Search className="size-5 text-muted-foreground" />
              <Input
                placeholder="Filtrar por dispositivo..."
                value={
                  (table
                    .getColumn("device-name")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("device-name")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm border-none focus-visible:ring-0"
              />
            </div>
          </DataTable.Filters>
          <DataTable.Table
            table={table}
            columns={deviceTableColumns}
            isLoading={false}
          />

          <div className="text-muted-foreground flex-1 text-sm mt-2">
            <p>Total: {devicesQuery.data?.length}</p>
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
