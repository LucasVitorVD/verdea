"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Device } from "@/interfaces/device";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { deviceTableColumns } from "./deviceTableColumns";
import { DataTable } from "@/components/data-table/index";
import axiosInstance from "@/lib/axios";
import { Search } from "lucide-react";
import EmptyState from "../empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { useDevices } from "@/hooks/useDevice";

export default function DevicesTable() {
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "signed" },
  ]);
  const { devicesQuery } = useDevices(false)
  const devicesData = devicesQuery.data as Device[]

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

  if (devicesData?.length === 0) {
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
            <p>Total: {devicesData?.length}</p>
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
