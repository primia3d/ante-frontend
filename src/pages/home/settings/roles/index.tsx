import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { createRole } from '@/api/role';
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
  roleSearchAtom,
} from '@/features/Role';
import { searchRoleList } from '@/api/role/searchRole';
import axios from 'axios';

export default function RoleManagement() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useAtom(roleCurrentPageAtom);
  const [pageSize, setPageSize] = useAtom(rolePageSizeAtom);
  // const [sort, setSort] = useAtom(roleSortAtom);
  // const [search] = useAtom(roleSearchAtom);
  const [queryEnabled, setQueryEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useAtom(roleSearchAtom);

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
    queryKey: ['getRoleList', searchQuery],
    queryFn: () => searchRoleList({ searchQuery, page: currentPage, perPage: pageSize }),
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
        description: 'New role has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast({
          description: error.response.data.message,
          className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
          duration: 3000,
        });
      } else {
        toast({
          description: 'An unexpected error occurred',
          className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
          duration: 3000,
        });
      }
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    setQueryEnabled(false);
    setQueryEnabled(true);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

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
          <RoleFilters onSearch={(query) => setSearchQuery(query)} />
          <DataTable
            data={roles}
            columns={RoleColumns}
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
