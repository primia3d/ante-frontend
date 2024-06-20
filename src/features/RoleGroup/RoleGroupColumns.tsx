/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';

import Description from '../Scope/Description';

import ViewRoleGroup from './ViewRoleGroup';
import { RoleGroupForm, RoleGroupFormProps } from './RoleGroupForm';
import { roleGroupCurrentPageAtom, roleGroupPageSizeAtom } from './roleGroupAtom';

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { useToast } from '@/components/Toaster/useToast';
import { TRoleGroup } from '@/types/roleGroup';
import { getCurrentUser } from '@/api/user';
import { deleteRoleGroup, getRoleGroupList, updateRoleGroup } from '@/api/roleGroup';

export const RoleGroupColumns: ColumnDef<TRoleGroup>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  //   cell: ({ getValue }) => <div className="truncate font-mono tracking-widest">{getValue<TRoleGroup['id']>()}</div>,
  //   meta: {
  //     className: 'max-w-[10rem]',
  //   },
  // },
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

      return <Description description={description} />;
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
      const { description, name, id } = row.original;

      const [currentPage] = useAtom(roleGroupCurrentPageAtom);
      const [pageSize] = useAtom(roleGroupPageSizeAtom);
      // const [search] = useAtom(roleSearchAtom);
      // const [sort] = useAtom(roleSortAtom);

      const updateRoleGroupMutation = useMutation({
        mutationFn: updateRoleGroup,
      });
      const deleteRoleGroupMutation = useMutation({
        mutationFn: deleteRoleGroup,
      });

      const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
      });

      const hasViewRoleGroup = currentUser?.roleAccess.some((accessID) => accessID === 'VIEW_ROLE_GROUP');
      const hasUpdateRoleGroup = currentUser?.roleAccess.some((accessID) => accessID === 'UPDATE_ROLE_GROUP');
      const hasDeleteRoleGroup = currentUser?.roleAccess.some((accessID) => accessID === 'DELETE_ROLE_GROUP');

      const { refetch } = useQuery({
        enabled: false,
        queryKey: ['getRoleGroupList'],
        queryFn: () =>
          getRoleGroupList({
            page: currentPage,
            perPage: pageSize,
          }),
      });

      const handleUpdate: RoleGroupFormProps['onSubmit'] = async (values) => {
        try {
          await updateRoleGroupMutation.mutateAsync({ id, ...values });

          await refetch();

          toast({
            description: 'Role Group has been successfully updated!',
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
          await deleteRoleGroupMutation.mutateAsync({ id });

          await refetch();

          toast({
            description: 'Role Group has been successfully deleted!',
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
          {hasViewRoleGroup && <ViewRoleGroup description={description} name={name} id={id} />}
          {hasUpdateRoleGroup && (
            <RoleGroupForm
              onSubmit={handleUpdate}
              variant="edit"
              values={{
                description,
                name,
              }}
            />
          )}
          {hasDeleteRoleGroup && (
            <ConfirmDialog
              label="Delete"
              message="Are you sure you want to delete this role Group?"
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
