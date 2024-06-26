import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button } from '../Button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export function DataTableToolbar<TData>({ table, children }: PropsWithChildren<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-end justify-between">
      <div className="relative flex flex-1 items-center space-x-2">
        {children}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
