import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { TRoleGroup } from '@/types/roleGroup';

export const ViewRoleGroupColumns: ColumnDef<TRoleGroup>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ getValue }) => <div className="truncate font-mono tracking-widest">{getValue<TRoleGroup['id']>()}</div>,
    meta: {
      className: 'max-w-[10rem]',
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => {
      return <div className="truncate">{getValue<TRoleGroup['name']>()}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[20rem]',
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ getValue }) => {
      const description = getValue<TRoleGroup['description']>();

      return <div className="truncate">{description}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'w-full min-w-[20rem]',
    },
  },
];
