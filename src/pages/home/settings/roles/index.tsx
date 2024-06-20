import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

import { createRole, getRoleList } from '@/api/role';
import { getCurrentUser } from '@/api/user';
import { DataTable } from '@/components/DataTable';
import { useToast } from '@/components/Toaster';
import {
  RoleColumns,
  RoleFilters,
  RoleForm,
  RoleFormProps,
  roleCurrentPageAtom,
  rolePageSizeAtom,
} from '@/features/Role';

export default function RoleManagement() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useAtom(roleCurrentPageAtom);
  const [pageSize, setPageSize] = useAtom(rolePageSizeAtom);
  // const [sort, setSort] = useAtom(roleSortAtom);
  // const [search] = useAtom(roleSearchAtom);
  const [queryEnabled, setQueryEnabled] = useState(true);

  const createRoleMutation = useMutation({
    mutationFn: createRole,
  });
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const hasCreateRole = currentUser?.roleAccess?.some((accessID) => accessID === 'CREATE_ROLE');

  const {
    data: { list: roles = [], pagination = [] } = {},
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['getRoleList'],
    queryFn: () =>
      getRoleList({
        page: currentPage,
        perPage: pageSize,
      }),
    enabled: queryEnabled,
  });

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    setQueryEnabled(false);
    await refetch();
    setQueryEnabled(true);
  };

  const handlePageSizeChange = async (newPageSize: number) => {
    setCurrentPage(1);
    setPageSize(newPageSize);
    setQueryEnabled(false);
    await refetch();
    setQueryEnabled(true);
  };

  const totalPages: number = pagination[pagination.length - 1] || 1;

  const handleSubmit: RoleFormProps['onSubmit'] = async (values) => {
    try {
      await createRoleMutation.mutateAsync({
        name: values.name,
        description: values.description,
        placement: values.placement,
        scopeIDs: values.scopeIDs,
        roleGroupId: values.roleGroupId,
        parentRoleId: values.parentRoleId,
        select: values.select,
      });

      await refetch();

      toast({
        description: 'New scope has successfully created!',
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
    <>
      {isFetching && (
        <div className="flex h-full animate-spin items-center justify-center">
          <Loader2Icon className="h-12 w-12" />
        </div>
      )}
      {!isFetching && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Role Management</h1>
            {hasCreateRole && <RoleForm variant="create" onSubmit={handleSubmit} />}
          </div>
          <DataTable
            data={roles}
            columns={RoleColumns}
            filters={RoleFilters}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            // onSortChange={(sorting) => {
            //   if (!sorting.length) return;

            //   const sortKey = sorting[0].id as keyof Role;
            //   const sortValue = sorting[0].desc ? 'desc' : 'asc';
            //   setSort({
            //     [sortKey]: sortValue,
            //   });
            // }}
          />
        </>
      )}
    </>
  );
}
