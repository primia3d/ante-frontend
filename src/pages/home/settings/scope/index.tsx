import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { ScopeColumns, ScopeFilters, scopeCurrentPageAtom, scopePageSizeAtom } from '@/features/Scope';
import { DataTable } from '@/components/DataTable';
import { getScopeList } from '@/api/scope/searchScope';

export default function ScopeManagement() {
  // const { data: currentUser } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: () => getCurrentUser(),
  // });
  const [currentPage, setCurrentPage] = useAtom(scopeCurrentPageAtom);
  const [pageSize, setPageSize] = useAtom(scopePageSizeAtom);
  const [searchQuery, setSearchQuery] = useState('');

  // const [sort, setSort] = useAtom(scopeSortAtom);
  // const [search] = useAtom(scopeSearchAtom);

  // const hasCreateScope = currentUser?.roleAccess.some((accessID) => accessID === 'CREATE_SCOPE');

  // const createFeatureMutation = trpc.roleAccess.scope.createScope.useMutation();

  const [queryEnabled, setQueryEnabled] = useState(true);

  const { data: { list: scopes = [], pagination = [] } = {}, refetch } = useQuery({
    queryKey: ['getScopeList', { searchQuery, currentPage, pageSize }],
    queryFn: () =>
      getScopeList({
        searchQuery,
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

  const handlePageSizeChange = async (newPage: number) => {
    setCurrentPage(1);
    setPageSize(newPage);
    setQueryEnabled(false);
    await refetch();
    setQueryEnabled(true);
  };

  const totalPages: number = pagination[pagination.length - 1] || 1;

  // const onSubmit: ScopeFormProps['onSubmit'] = async (values) => {
  //   try {
  //     await createFeatureMutation.mutateAsync(values);

  //     await refetch();

  //     toast({
  //       description: 'New scope has successfully created!',
  //       className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
  //       duration: 3000,
  //     });
  //   } catch (error) {
  //     toast({
  //       description: 'Oops! something went wrong',
  //       className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
  //       duration: 3000,
  //     });
  //   }
  // };

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1); // Reset page to 1 when performing a new search
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Scope Management</h1>
        {/* {hasCreateScope && <ScopeForm variant="create" onSubmit={onSubmit} />} */}
      </div>
      <ScopeFilters onSearch={handleSearch} />
      <DataTable
        data={scopes}
        columns={ScopeColumns}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        // onSortChange={(sorting) => {
        //   if (!sorting.length) return;

        //   const sortKey = sorting[0].id as keyof Scope;
        //   const sortValue = sorting[0].desc ? 'desc' : 'asc';
        //   setSort({
        //     [sortKey]: sortValue,
        //   });
        // }}
      />
    </>
  );
}
