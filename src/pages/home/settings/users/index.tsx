import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { DataTable } from '@/components/DataTable';
import { useToast } from '@/components/Toaster/useToast';
import {
  UserColumns,
  UserFilters,
  UserForm,
  UserFormProps,
  userCurrentPageAtom,
  userPageSizeAtom,
} from '@/features/User';
import { useBoolean } from '@/hooks/useBoolean';
// import { trpc } from '@/libs/trpc/react';
import { createUser, getCurrentUser, getUserList } from '@/api/user';

export default function Users() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useAtom(userCurrentPageAtom);
  const [pageSize, setPageSize] = useAtom(userPageSizeAtom);
  const [queryEnabled, setQueryEnabled] = useState(true);

  // const [sort, setSort] = useAtom(userSortAtom);
  // const [search] = useAtom(userSearchAtom);
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);
  // const createMutation = trpc.user.user.createUser.useMutation();
  const createMutation = useMutation({
    mutationFn: createUser,
  });
  // const { data: currentUser } = trpc.user.user.getCurrentUser.useQuery();
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const hasCreateUsers = currentUser?.roleAccess.some((accessID) => accessID === 'CREATE_USERS');

  const handleSubmit: UserFormProps['onSubmit'] = async (values) => {
    await createMutation.mutateAsync(values);
    setIsFormOpen(false);
    toast({
      description: 'New user has successfully created!',
      className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
      duration: 3000,
    });
  };

  const values: UserFormProps['values'] = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    // address: '',
    username: '',
    password: '',
    roleID: '',
  };

  const { data: { list: users = [], pagination = [] } = {}, refetch } = useQuery({
    queryKey: ['getUserList'],
    queryFn: () => getUserList({ page: currentPage, perPage: pageSize }),
    enabled: queryEnabled,
  });

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    setQueryEnabled(false);
    await refetch();
    setQueryEnabled(true);
  };

  const handlePageSizeChange = async (newPage: number) => {
    setCurrentPage(1);
    setPageSize(newPage);
    setQueryEnabled(false);
    await refetch();
    setQueryEnabled(true);
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">User Management</h1>
        {hasCreateUsers && (
          <UserForm
            values={values}
            onSubmit={handleSubmit}
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            title="New User"
            variant="create"
            label="Add User"
          />
        )}
      </div>
      <DataTable
        data={users}
        columns={UserColumns}
        filters={UserFilters}
        onPageChange={handlePageChange}
        totalPages={pagination[(pagination.length || 0) - 1] ?? 0}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        // onSortChange={(sorting) => {
        //   if (!sorting.length) return;

        //   const sortKey = (sorting[0].id === 'role_name' ? 'roleId' : sorting[0].id) as keyof User;
        //   const sortValue = sorting[0].desc ? 'desc' : 'asc';
        //   setSort({
        //     [sortKey]: sortValue,
        //   });
        // }}
      />
    </>
  );
}
