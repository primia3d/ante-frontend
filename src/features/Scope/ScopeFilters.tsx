import { SearchIcon, X } from 'lucide-react';
import { useAtom } from 'jotai';

import { scopeSearchAtom } from './scopeAtom';

import { Input } from '@/components/Input';
// import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export function ScopeFilters() {
  const [search, setSearch] = useAtom(scopeSearchAtom);
  // const { globalSearchValue, handleGlobalSearch, handleReset } = useGlobalSearch({ table });
  // const isFiltered = table.getState().globalFilter && table.getState().globalFilter.length > 0;

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="h-9 w-full bg-white pl-8"
      />
      <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      {!!search.length && (
        <button
          type="button"
          // onClick={handleReset}
          aria-label="icon-button"
          className="absolute right-2.5  top-1/2 h-4 w-4 -translate-y-1/2 "
        >
          <X className=" h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
