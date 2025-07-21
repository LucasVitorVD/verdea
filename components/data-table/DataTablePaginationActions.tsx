import React from "react";

interface DataTablePaginationActionsProps {
  children: React.ReactNode;
}

export function DataTablePaginationActions({
  children,
}: DataTablePaginationActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {children}
    </div>
  );
}
