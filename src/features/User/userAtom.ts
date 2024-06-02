import { atom } from 'jotai';

export const userCurrentPageAtom = atom(1);
export const userPageSizeAtom = atom(20);
export const userSearchAtom = atom('');
export const userSortAtom = atom<{
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  userName?: 'asc' | 'desc';
  roleId?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
  contact?: 'asc' | 'desc';
  address?: 'asc' | 'desc';
}>({});
