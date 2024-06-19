import { ColumnDef } from '@tanstack/react-table';

import Description from './Description';

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { TScope } from '@/types/scope';

export const ScopeColumns: ColumnDef<TScope>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  //   cell: ({ getValue }) => <div className="truncate font-mono tracking-widest">{getValue<TScope['id']>()}</div>,
  //   meta: {
  //     className: 'max-w-[10rem]',
  //   },
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => {
      return <div className="truncate">{getValue<TScope['name']>()}</div>;
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
      const description = getValue<TScope['description']>();

      return <Description description={description} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      className: 'w-full min-w-[20rem]',
    },
  },
  // {
  //   id: 'actions',
  //   header: () => <div className="text-center">Actions</div>,
  //   cell: function Cell({ row }) {
  //     const { id, type, name, description } = row.original;
  //     const [currentPage] = useAtom(scopeCurrentPageAtom);
  //     const [pageSize] = useAtom(scopePageSizeAtom);
  //     const [search] = useAtom(scopeSearchAtom);
  //     const [sort] = useAtom(scopeSortAtom);
  //     // const editFeatureMutation = trpc.roleAccess.scope.updateScope.useMutation();
  //     // const deleteFeatureMutation = trpc.roleAccess.scope.deleteScope.useMutation();

  //     const { data: currentUser } = useQuery({
  //       enabled: false,
  //       queryKey: ['getCurrentUser'],
  //       queryFn: () => getCurrentUser(),
  //     });

  //     const hasUpdateRole = currentUser?.roleAccess.some((accessID) => accessID === 'UPDATE_ROLE');
  //     const hasDeleteRole = currentUser?.roleAccess.some((accessID) => accessID === 'DELETE_ROLE');

  //     const { refetch } = trpc.roleAccess.scope.getScopesWithPagination.useQuery({
  //       currentPage,
  //       pageSize,
  //       search,
  //       sort,
  //     });

  //     const handleEdit: ScopeFormProps['onSubmit'] = async (values) => {
  //       await editFeatureMutation.mutateAsync({
  //         ...values,
  //       });
  //       await refetch();
  //     };

  //     const handleDelete = async () => {
  //       await deleteFeatureMutation.mutateAsync({ id: row.original.id });

  //       await refetch();
  //     };

  //     return (
  //       <div className="flex items-center justify-center gap-2">
  //         {hasUpdateRole && <ScopeForm variant="edit" values={{ id, type, name, description }} onSubmit={handleEdit} />}
  //         {hasDeleteRole && (
  //           <ConfirmDialog
  //             label="Delete"
  //             message="Are you sure you want to delete this scope?"
  //             title="Delete"
  //             type="button"
  //             className="flex h-8 items-center gap-2 bg-error-300 font-normal text-white hover:bg-error-500/90"
  //             icon={<Trash2 className="h-4 w-4 shrink-0" />}
  //             handleSubmit={handleDelete}
  //           />
  //         )}
  //       </div>
  //     );
  //   },
  // },
];
