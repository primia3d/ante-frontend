import { atom } from 'jotai';

export const roleGroupCurrentPageAtom = atom(1);
export const roleGroupPageSizeAtom = atom(20);
export const roleGroupSearchAtom = atom('');
export const roleGroupSortAtom = atom<{
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
}>({});
