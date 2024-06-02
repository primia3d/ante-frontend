import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Button } from '../Button';

import { cn } from '@/utils/cn';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSize?: number;
  totalPages: number;
  currentPage: number;
  maxVisiblePages?: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
}

export function DataTablePagination<TData>({
  table,
  pageSize = 20,
  totalPages,
  currentPage,
  maxVisiblePages = 5,
  onPageChange: handlePageChange,
  onPageSizeChange: handlePageSizeChange,
}: DataTablePaginationProps<TData>) {
  // eslint-disable-next-line no-underscore-dangle
  const hasSelect = table._getColumnDefs().some(({ id }) => id === 'select');

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pageNumbers = Array.from({ length: totalPages })
    .slice(startPage - 1, endPage)
    .map((_, i) => startPage + i);

  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-4">
      {hasSelect && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
      )}
      <div className="hidden items-center justify-center text-sm font-medium xs:flex">
        Page
        <span className="mx-1 font-semibold">{currentPage}</span>
        of
        <span className="mx-1 font-semibold">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-9 w-9 p-0 lg:flex"
          onClick={() => handlePageChange(1)}
          disabled={currentPage <= 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-9 w-9 p-0"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            className={cn('h-9 w-9 p-0', currentPage === page && 'bg-primary-100 text-white hover:bg-blue-600')}
            onClick={() => handlePageChange(page)}
          >
            <span className="sr-only">Go to page {page}</span>
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          className="h-9 w-9 p-0"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-9 w-9 p-0 lg:flex"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {!!handlePageSizeChange && (
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              handlePageSizeChange?.(Number(value));
            }}
          >
            <SelectTrigger className="h-9 w-[70px] bg-white">
              <SelectValue placeholder={table.getState().pagination.pageSize + 1} />
            </SelectTrigger>
            <SelectContent side="top" className="min-w-[4rem]">
              {[5, 10, 20, 30, 40, 50, 100].map((pageSizeItem) => (
                <SelectItem key={pageSizeItem} value={pageSizeItem.toString()}>
                  {pageSizeItem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
