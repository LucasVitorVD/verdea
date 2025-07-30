import { ColumnDef, Table as TansTackTable } from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import Spinner from "../spinner/Spinner";
import type { Device } from "@/interfaces/device";
import EmptyState from "../empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";

interface DataTableProps<TData, TValue> {
  table: TansTackTable<Device>;
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
}

export function DataTableTable<TData, TValue>({
  table,
  columns,
  isLoading,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-64 text-center">
                <Spinner />
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!isLoading && !table.getRowModel().rows?.length && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-26 text-center">
                <EmptyState
                  title="Nenhum dispositivo encontrado… por enquanto!"
                  description="Adicione seu primeiro dispositivo e acompanhe tudo com a ajuda da Verdea, em tempo real."
                  imgSrc={EmptyIllustration}
                  imgAlt="Ilustração de dispositivo não encontrado"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
