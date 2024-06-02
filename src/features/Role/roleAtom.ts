import { atom } from 'jotai';

export const roleCurrentPageAtom = atom(1);
export const rolePageSizeAtom = atom(20);
export const roleSearchAtom = atom('');
export const roleSortAtom = atom<{
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
}>({});
