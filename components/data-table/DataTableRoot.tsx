import React from 'react'

interface DataTableProps {
  children: React.ReactNode
}

export function DataTableRoot({ children }: DataTableProps) {
  return (
    <div>
      {children}
    </div>
  )
}