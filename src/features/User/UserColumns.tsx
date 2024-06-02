import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { UserForm, UserFormProps } from './UserForm';
import ViewUser from './View';
import { userCurrentPageAtom, userPageSizeAtom } from './userAtom';

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { useToast } from '@/components/Toaster/useToast';
import { useBoolean } from '@/hooks/useBoolean';
import { TUser } from '@/types/user';
import { deleteUser, getCurrentUser, updateUser, getUserList } from '@/api/user';

const columnHelper = createColumnHelper<TUser>();

export const UserColumns = [
  columnHelper.accessor('id', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ getValue }) => <div className="truncate font-mono tracking-widest">{getValue()}</div>,
    meta: {
      className: 'max-w-[10rem]',
    },
  }),
  columnHelper.accessor('firstName', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <div className="truncate">{`${firstName} ${lastName}`}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[14rem]',
    },
  }),
  columnHelper.accessor('username', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[14rem]',
    },
  }),
  columnHelper.accessor('role.name', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[14rem]',
    },
  }),
  columnHelper.accessor('email', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ getValue }) => {
      return <div>{getValue()}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[14rem]',
    },
  }),
  columnHelper.accessor('contactNumber', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact No." />,
    cell: ({ getValue }) => {
      return <div>{getValue<TUser['contactNumber']>()}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'min-w-[14rem]',
    },
  }),
  // columnHelper.accessor('address', {
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
  //   cell: ({ getValue }) => {
  //     return <div>{getValue<TUser['address']>()}</div>;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   meta: {
  //     className: 'w-full',
  //   },
  // }),
  columnHelper.display({
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: function Cell({ row }) {
      const { toast } = useToast();
      const { value: isViewFormOpen, set: setIsViewFormOpen } = useBoolean(false);
      const { value: isEditFormOpen, set: setIsEditFormOpen } = useBoolean(false);
      const {
        firstName,
        lastName,
        // address,
        contactNumber,
        email,
        // password,
        role,
        username,
      } = row.original;

      const [currentPage] = useAtom(userCurrentPageAtom);
      const [pageSize] = useAtom(userPageSizeAtom);

      const updateMutation = useMutation({
        mutationFn: updateUser,
      });
      const deleteMutation = useMutation({
        mutationFn: deleteUser,
      });

      const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        enabled: false,
      });

      const hasViewUser = currentUser?.roleAccess.some((accessID) => accessID === 'VIEW_USERS');
      const hasUpdateUser = currentUser?.roleAccess.some((accessID) => accessID === 'UPDATE_USERS');
      const hasDeleteUser = currentUser?.roleAccess.some((accessID) => accessID === 'DELETE_USERS');

      const { refetch } = useQuery({
        enabled: false,
        queryKey: ['getUserList'],
        queryFn: () =>
          getUserList({
            page: currentPage,
            perPage: pageSize,
          }),
      });

      const handleUpdate: UserFormProps['onSubmit'] = async (values) => {
        await updateMutation.mutateAsync({
          id: row.original.id,
          ...values,
        });

        await refetch();

        setIsEditFormOpen(false);
        toast({
          description: 'User has been successfully updated',
          className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
          duration: 3000,
        });
      };

      const handleDelete = async () => {
        await deleteMutation.mutateAsync({ id: row.original.id });

        await refetch();

        setIsEditFormOpen(false);
        toast({
          description: 'User has been successfully deleted!',
          className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
          duration: 3000,
        });
      };

      return (
        <div className="flex items-center justify-center gap-2">
          {hasViewUser && (
            <ViewUser
              isOpen={isViewFormOpen}
              setIsOpen={setIsViewFormOpen}
              values={{
                firstName,
                lastName,
                // address,
                contactNumber,
                email,
                password: '',
                roleID: role.id,
                username,
              }}
              onSubmit={handleUpdate}
              isEditFormOpen={isEditFormOpen}
              setIsEditFormOpen={setIsEditFormOpen}
            />
          )}
          {hasUpdateUser && (
            <UserForm
              values={{
                firstName,
                lastName,
                // address,
                contactNumber,
                email,
                password: '',
                roleID: role.id,
                username,
              }}
              onSubmit={handleUpdate}
              isOpen={isEditFormOpen}
              setIsOpen={setIsEditFormOpen}
              title="Edit User"
              variant="edit"
              label="Edit"
            />
          )}
          {hasDeleteUser && (
            <ConfirmDialog
              label="Delete"
              message="Are you sure you want to delete this user?"
              title="Delete"
              type="button"
              className="flex h-8 items-center gap-2 bg-error-300 font-normal text-white hover:bg-error-500"
              icon={<Trash2 className="h-4 w-4 shrink-0" />}
              handleSubmit={handleDelete}
            />
          )}
        </div>
      );
    },
  }),
] as ColumnDef<TUser>[];
