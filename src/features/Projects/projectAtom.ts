import { atom } from 'jotai';

export const projectCurrentPageAtom = atom(1);
export const projectPageSizeAtom = atom(20);
export const projectSearchAtom = atom('');
export const projectSortAtom = atom<{
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
}>({});

export const isKanbanMode = atom(false);
