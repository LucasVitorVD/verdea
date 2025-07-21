import React from "react";
import { Button } from "../ui/button";

interface DataTablePaginationActionProps extends React.ComponentPropsWithRef<typeof Button> {
  children: React.ReactNode
}

export function DataTablePaginationAction({ children, ...props }: DataTablePaginationActionProps) {
  return (
    <Button
      /* variant="outline"
      size="sm"
      onClick={onPrevious}
      disabled={!canPrevious} */
      {...props}
    >
      {children}
    </Button>
  );
}