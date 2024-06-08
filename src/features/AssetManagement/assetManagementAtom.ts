import { inventoryItems } from '@/pages/home/asset-management/Inventory';
import { TInventory } from '@/types/assetManagement';
import { atom } from 'jotai';

export const assetManagementTabAtom = atom('purchasing');
export const purchasingViewAtom = atom<'card' | 'list'>('card');
export const warehouseViewAtom = atom<'card' | 'list'>('card');
export const deliveriesViewAtom = atom<'list' | 'calendar'>('list');
export const equipmentViewAtom = atom<'list' | 'calendar'>('list');

//Inventory
export const inventoryAtom = atom<TInventory[]>(inventoryItems);
export const inventoryCurrentPageAtom = atom(1);
export const inventoryPageSizeAtom = atom(10);
