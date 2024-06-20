import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

import { createRoleGroup, getRoleGroupList } from '@/api/roleGroup';
import { getCurrentUser } from '@/api/user';
import { DataTable } from '@/components/DataTable';
import { useToast } from '@/components/Toaster';
import {
  RoleGroupColumns,
  RoleGroupFilters,
  RoleGroupForm,
  RoleGroupFormProps,
  roleGroupCurrentPageAtom,
  roleGroupPageSizeAtom,
} from '@/features/RoleGroup';

export default function RoleGroupManagement() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useAtom(roleGroupCurrentPageAtom);
  const [pageSize, setPageSize] = useAtom(roleGroupPageSizeAtom);
  const [queryEnabled, setQueryEnabled] = useState(true);

  // const [sort, setSort] = useAtom(roleSortAtom);
  // const [search] = useAtom(roleSearchAtom);

  const createRoleGroupMutation = useMutation({
    mutationFn: createRoleGroup,
  });
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const hasCreateRoleGroup = currentUser?.roleAccess?.some((accessID) => accessID === 'CREATE_ROLE_GROUP');

  const {
    data: { list: roleGroup = [], pagination = [] } = {},
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['getRoleGroupList'],
    queryFn: () =>
      getRoleGroupList({
        page: currentPage,
        perPage: pageSize,
        isDeleted: false,
      }),
    enabled: queryEnabled,
  });
  const filteredRoleGroup = roleGroup.filter((item) => !item.isDeleted);

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

  const totalPages: number = pagination[pagination.length - 1] || 1;

  const handleSubmit: RoleGroupFormProps['onSubmit'] = async (values) => {
    try {
      await createRoleGroupMutation.mutateAsync({
        name: values.name,
        description: values.description,
      });

      await refetch();

      toast({
        description: 'New Role Group has successfully created!',
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
            <h1 className="text-lg font-semibold">Role Group Management</h1>
            {hasCreateRoleGroup && <RoleGroupForm variant="create" onSubmit={handleSubmit} />}
          </div>
          <DataTable
            data={filteredRoleGroup}
            columns={RoleGroupColumns}
            filters={RoleGroupFilters}
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
