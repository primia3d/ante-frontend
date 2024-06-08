import { atom } from 'jotai';

export const assetManagementTabAtom = atom('purchasing');
export const purchasingViewAtom = atom<'card' | 'list'>('card');
export const warehouseViewAtom = atom<'card' | 'list'>('card');
export const deliveriesViewAtom = atom<'list' | 'calendar'>('list');
export const equipmentViewAtom = atom<'list' | 'calendar'>('list');
