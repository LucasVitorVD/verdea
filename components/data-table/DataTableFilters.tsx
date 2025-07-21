import React from "react";

interface DataTableFiltersProps {
  children: React.ReactNode
}

export function DataTableFilters({ children }: DataTableFiltersProps) {
  return (
    <div className="flex items-center py-4 gap-2">
      {children}
    </div>
  );
}
