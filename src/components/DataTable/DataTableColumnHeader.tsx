import { Column } from '@tanstack/react-table';
// import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuTrigger } from '../DropdownMenu';
import { Button } from '../Button';

import { cn } from '@/utils/cn';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 text-sm data-[state=open]:bg-accent">
            <span className="truncate">{title}</span>
            {/* {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-3 w-3" />}
            {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-3 w-3" />}
            {!['desc', 'asc'].includes(column.getIsSorted() as string) && <ArrowUpDownIcon className="ml-2 h-3 w-3" />} */}
          </Button>
        </DropdownMenuTrigger>
        {/* <DropdownMenuContent align="start" className="[&>*]:cursor-pointer">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {column.getIsSorted() && (
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <ArrowUpDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Clear
            </DropdownMenuItem>
          )}
        </DropdownMenuContent> */}
      </DropdownMenu>
    </div>
  );
}
