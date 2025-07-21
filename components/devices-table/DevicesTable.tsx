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
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { deviceTableColumns } from "./deviceTableColumns";
import { DataTable } from "@/components/data-table/index";
import axiosInstance from "@/lib/axios";
import { Search } from "lucide-react";

export default function DevicesTable() {
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "signed" },
  ]);

  const devicesQuery = useQuery({
    queryKey: ["getUserDevices"],
    queryFn: async () => {
      try {
        const request = await axiosInstance.get(
          process.env.NEXT_PUBLIC_API_URL + "/device/my-devices"
        );

        return request.data as Device[];
      } catch (error) {
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });

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
                  (table.getColumn("device-name")?.getFilterValue() as string) ??
                  ""
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
          <DataTable.Pagination>
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
          </DataTable.Pagination>
        </DataTable.Root>
      </CardContent>
    </Card>
  );
}
