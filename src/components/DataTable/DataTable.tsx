import { FC, useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';

import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  pageSize: number;
  data: TData[];
  totalPages: number;
  currentPage: number;
  maxVisiblePages?: number;
  columns: ColumnDef<TData, TValue>[];
  onPageChange: (newPage: number) => void;
  onSortChange?: (sorting: SortingState) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  filters?: FC<{ table: ReturnType<typeof useReactTable<TData>> }>;
}

export function DataTable<TData, TValue>({
  filters: Filters,
  columns,
  data,
  pageSize,
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages,
  onPageSizeChange,
  onSortChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    manualSorting: true,
    autoResetPageIndex: true,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    onSortChange?.(sorting);
  }, [onSortChange, sorting]);

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar table={table}>{Filters && <Filters table={table} />}</DataTableToolbar>
      <div className="flex-1 overflow-auto rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={(header.column.columnDef.meta as Record<string, string>)?.className}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`group py-1.5 ${(cell.column.columnDef.meta as Record<string, string>)?.className}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        maxVisiblePages={maxVisiblePages}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
