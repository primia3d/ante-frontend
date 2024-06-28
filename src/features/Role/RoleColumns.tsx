/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useAtom } from 'jotai';
import { Trash2 } from 'lucide-react';

import Description from '../Scope/Description';

import { RoleForm, RoleFormProps } from './RoleForm';
import ViewRole from './ViewRole';
import { roleCurrentPageAtom, rolePageSizeAtom } from './roleAtom';

import { deleteRole, getRoleList, updateRole } from '@/api/role';
import { getCurrentUser } from '@/api/user';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { useToast } from '@/components/Toaster/useToast';
import { TRole } from '@/types/role';

export const RoleColumns: ColumnDef<TRole>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  //   cell: ({ getValue }) => <div className="truncate font-mono tracking-widest">{getValue<TRole['id']>()}</div>,
  //   meta: {
  //     className: 'max-w-[10rem]',
  //   },
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => {
      return <div className="truncate">{getValue<TRole['name']>()}</div>;
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
      const description = getValue<TRole['description']>();

      return (
        <div className="max-w-sm truncate">
          <Description description={description} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { toast } = useToast();
      const { description, name, id, roleScope, roleGroupId } = row.original;

      const [currentPage] = useAtom(roleCurrentPageAtom);
      const [pageSize] = useAtom(rolePageSizeAtom);
      // const [search] = useAtom(roleSearchAtom);
      // const [sort] = useAtom(roleSortAtom);

      const updateRoleMutation = useMutation({
        mutationFn: updateRole,
      });
      const deleteRoleMutation = useMutation({
        mutationFn: deleteRole,
      });

      const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
      });

      const hasViewRole = currentUser?.roleAccess?.some((accessID) => accessID === 'VIEW_ROLE');
      const hasUpdateRole = currentUser?.roleAccess?.some((accessID) => accessID === 'UPDATE_ROLE');
      const hasDeleteRole = currentUser?.roleAccess?.some((accessID) => accessID === 'DELETE_ROLE');

      const { refetch } = useQuery({
        enabled: false,
        queryKey: ['getRoleList'],
        queryFn: () =>
          getRoleList({
            page: currentPage,
            perPage: pageSize,
          }),
      });

      const handleUpdate: RoleFormProps['onSubmit'] = async (values) => {
        try {
          await updateRoleMutation.mutateAsync({ id, ...values });

          await refetch();

          toast({
            description: 'Role has been successfully updated',
            className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
            duration: 3000,
          });
        } catch (error) {
          toast({
            description: 'Oops! something went wrong',
            className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
            duration: 3000,
          });
        }
      };

      const handleDelete = async () => {
        try {
          await deleteRoleMutation.mutateAsync({ id });

          await refetch();

          toast({
            description: 'Role has been successfully deleted!',
            className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
            duration: 3000,
          });
        } catch (error) {
          toast({
            description: 'Oops! something went wrong',
            className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
            duration: 3000,
          });
        }
      };

      return (
        <div className="flex items-center justify-center gap-2">
          {hasViewRole && <ViewRole description={description} name={name} id={id} />}
          {hasUpdateRole && (
            <RoleForm
              onSubmit={handleUpdate}
              variant="edit"
              values={{
                description,
                name,
                placement: 'above',
                select: '',
                scopeIDs: roleScope.map(({ scopeID }) => scopeID),
                roleGroupId: roleGroupId,
              }}
            />
          )}
          {hasDeleteRole && (
            <ConfirmDialog
              label="Delete"
              message="Are you sure you want to delete this role?"
              title="Delete"
              type="button"
              className="flex h-8 items-center gap-2 bg-error-300 font-normal text-white hover:bg-error-500/90"
              icon={<Trash2 className="h-4 w-4 shrink-0" />}
              handleSubmit={handleDelete}
            />
          )}
        </div>
      );
    },
  },
];
