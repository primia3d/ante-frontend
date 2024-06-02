import { atom } from 'jotai';

export const scopeCurrentPageAtom = atom(1);
export const scopePageSizeAtom = atom(20);
export const scopeSearchAtom = atom('');
export const scopeSortAtom = atom<{
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
}>({});
