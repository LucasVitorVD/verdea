"use client";

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
import { Search } from "lucide-react";
import EmptyState from "../empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { useDevices } from "@/hooks/useDevice";

export default function DevicesTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "signed" },
  ]);
  const { devicesQuery } = useDevices(false)

  const table = useReactTable({
    data: devicesQuery.data as Device[] ?? [],
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

  if (devicesQuery.data && devicesQuery.data.length === 0) {
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
            <p>Total: {devicesQuery.data?.length ?? 0}</p>
          </div>
        </DataTable.Root>
      </CardContent>
    </Card>
  );
}
