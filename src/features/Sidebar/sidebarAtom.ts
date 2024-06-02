import { atom } from 'jotai';

const baseSidebarAtom = atom(localStorage.getItem('sidebar') === 'true');

export const sidebarAtom = atom(
  (get) => get(baseSidebarAtom),
  (_get, set, newStr: boolean) => {
    set(baseSidebarAtom, newStr);
    localStorage.setItem('sidebar', newStr ? 'true' : 'false');
  },
);
