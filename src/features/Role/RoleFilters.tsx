import { SearchIcon, X } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';

import { roleSearchAtom } from './roleAtom';

import { Input } from '@/components/Input';
// import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export function RoleFilters({ onSearch }: { onSearch: (searchQuery: string) => void }) {
  const [search, setSearch] = useAtom(roleSearchAtom);
  const [inputValue, setInputValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);
  // const { globalSearchValue, handleGlobalSearch, handleReset } = useGlobalSearch({ table });
  // const isFiltered = table.getState().globalFilter && table.getState().globalFilter.length > 0;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleReset = () => {
    setSearch('');
    onSearch('');
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
        className="h-9 w-full bg-white pl-8"
      />
      <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      {!!search.length && (
        <button
          type="button"
          onClick={handleReset}
          aria-label="icon-button"
          className="absolute right-2.5  top-1/2 h-4 w-4 -translate-y-1/2 "
        >
          <X className=" h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
