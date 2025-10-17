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
import { DataTable } from "@/components/data-table/index";
import { BadgePlus, Plus, Search } from "lucide-react";
import EmptyState from "@/components/empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePlants } from "@/hooks/admin/usePlants";
import { plantTableColumns } from "./plantTableColumns";
import PlantForm from "@/components/forms/PlantForm";
import { Button } from "@/components/ui/button"

export default function PlantsTable() {
  const { plantsQuery } = usePlants();
  const [page, setPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "name", value: "" },
  ]);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data: plantsQuery.data ?? [],
    columns: plantTableColumns,
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
      <CardHeader>
        <CardTitle>Gerenciar Plantas</CardTitle>
        <CardDescription>
          Visualize e gerencie todos as plantas do sistema
        </CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <div className="flex items-center gap-2">
                  <Plus className="mr-px size-4" />
                  Adicionar Planta
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-[90vh] lg:min-w-4xl">
              <DialogHeader>
                <DialogTitle>Nova planta</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da sua nova planta para começar a
                  monitorá-la.
                </DialogDescription>
              </DialogHeader>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Planta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PlantForm onSuccess={() => setOpen(false)} isAdmin />
                  </CardContent>
                </Card>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" form="add-plant-form">
                  <Plus className="mr-px size-4" />
                  Adicionar Planta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        {plantsQuery.data && plantsQuery.data.length > 0 ? (
          <DataTable.Root>
            <DataTable.Filters>
              <div className="flex items-center gap-2 border rounded-sm pl-2">
                <Search className="size-5 text-muted-foreground" />
                <Input
                  placeholder="Filtrar por nome..."
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm border-none focus-visible:ring-0"
                />
              </div>
            </DataTable.Filters>
            <DataTable.Table
              table={table}
              columns={plantTableColumns}
              isLoading={false}
            />

            <div className="text-muted-foreground flex-1 text-sm mt-2">
              <p>Total: {plantsQuery.data?.length}</p>
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
        ) : (
          <EmptyState
            title="Nenhuma planta encontrada… por enquanto!"
            description="Adicione uma planta e acompanhe tudo com a ajuda da Verdea, em tempo real."
            imgSrc={EmptyIllustration}
            imgAlt="Ilustração de planta não encontrada"
          />
        )}
      </CardContent>
    </Card>
  );
}
