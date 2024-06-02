import { atom } from 'jotai';

const baseTokenAtom = atom(localStorage.getItem('auth-token'));

export const tokenAtom = atom(
  (get) => get(baseTokenAtom),
  (_get, set, newStr: string) => {
    set(baseTokenAtom, newStr);
    localStorage.setItem('auth-token', newStr);
  },
);
