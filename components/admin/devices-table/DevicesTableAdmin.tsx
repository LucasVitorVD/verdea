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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deviceTableColumns } from "./deviceTableColumns";
import { DataTable } from "@/components/data-table/index";
import { RotateCw, Search } from "lucide-react";
import EmptyState from "@/components/empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { useDevices } from "@/hooks/useDevice";
import { DeviceAdmin } from "@/interfaces/device";
import { Button } from "@/components/ui/button";

export default function DevicesTableAdmin() {
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "signed" },
  ]);
  const { devicesQuery } = useDevices(true);
  const devicesData = devicesQuery.data as DeviceAdmin[];

  const table = useReactTable({
    data: devicesData ?? [],
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
      <div className="flex flex-col items-center gap-4">
        <EmptyState
          title="Nenhum dispositivo encontrado… por enquanto!"
          description="Assim que um novo dispositivo for ativado e se registrar na plataforma, ele aparecerá automaticamente aqui."
          imgSrc={EmptyIllustration}
          imgAlt="Ilustração de dispositivo não encontrado"
        />

        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onClick={() => devicesQuery.refetch()}
          disabled={devicesQuery.isFetching}
        >
          <RotateCw className={devicesQuery.isFetching ? "animate-spin" : ""} />
          Atualizar
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Gerenciar Dispositivos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os dispositivos do sistema
          </CardDescription>
        </div>

        <Button variant="outline" onClick={() => devicesQuery.refetch()} disabled={devicesQuery.isFetching}>
          <RotateCw className={devicesQuery.isFetching ? "animate-spin" : ""} />
          Atualizar
        </Button>
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
