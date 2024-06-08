import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { Input } from '@/components/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { AddInventoryItem, assetManagementTabAtom } from '@/features/AssetManagement';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { useAtom } from 'jotai';
import { EllipsisIcon, EllipsisVerticalIcon } from 'lucide-react';
import { useState } from 'react';

export type TInventory = {
  id: string;
  description: string;
  stocks: number;
  uom: string;
  unitPrice: number;
  totalCost: number;
  location: string;
};

export const inventoryHeader = [
  'Item Number',
  'Item Description',
  'Stocks',
  'Unit of Measure',
  'Unit Price',
  'Total Cost',
  'Location',
  '',
];

export const inventoryItems: TInventory[] = [
  {
    id: 'inventory-1',
    description: 'Steel Bar',
    stocks: 50,
    uom: 'pc.',
    unitPrice: 0,
    totalCost: 0,
    location: 'main warehouse',
  },
  {
    id: 'inventory-2',
    description: 'Steel Bar',
    stocks: 50,
    uom: 'pc.',
    unitPrice: 0,
    totalCost: 0,
    location: 'main warehouse',
  },
  {
    id: 'inventory-3',
    description: 'Steel Bar',
    stocks: 50,
    uom: 'pc.',
    unitPrice: 0,
    totalCost: 0,
    location: 'main warehouse',
  },
  {
    id: 'inventory-4',
    description: 'Steel Bar',
    stocks: 50,
    uom: 'pc.',
    unitPrice: 0,
    totalCost: 0,
    location: 'main warehouse',
  },
  {
    id: 'inventory-5',
    description: 'Steel Bar',
    stocks: 50,
    uom: 'pc.',
    unitPrice: 0,
    totalCost: 0,
    location: 'main warehouse',
  },
];

export default function Inventory() {
  const [, setTab] = useAtom(assetManagementTabAtom);
  const [inventory, setInventory] = useState<TInventory[]>(inventoryItems);
  const { value: isAddItemOpen, set: setIsAddItemOpen } = useBoolean(false);

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold">Asset Management</h2>
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink pathName="/asset-management" onClick={() => setTab('warehouse')}>
                  Project Warehouse
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-primary-100">Main Warehouse</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'primary'} className="w-28 justify-between px-4">
                <span className="w-full text-center">Action</span>
                <EllipsisVerticalIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Edit Inventory
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Accept Item
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Request for Delivery
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Delivery History
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Request for Purchase
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={() => setIsAddItemOpen(true)}>
                Add Item
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()}>
                Lock Inventory
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AddInventoryItem isOpen={isAddItemOpen} setIsOpen={setIsAddItemOpen} />
        </div>
      </div>
      <section className="h-full flex-1 rounded-xl bg-white">
        <div className="flex items-center justify-between gap-5 p-5 lg:p-8">
          <h3 className="text-lg font-bold text-custom-400">Inventory</h3>
          <div className="relative w-full lg:max-w-72">
            <Input
              type="text"
              placeholder="Search..."
              className="h-9 min-w-52 rounded border bg-white placeholder:font-semibold placeholder:text-custom-200 lg:min-w-72"
            />
            <CustomIcon variant="search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-custom-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="">
            <TableHeader>
              <TableRow className="border-none bg-custom-100">
                {inventoryHeader.map((item) => (
                  <TableHead key={item} className="p-5 text-[15px] font-bold text-custom-300">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map(({ description, id, location, stocks, totalCost, unitPrice, uom }, index) => (
                <TableRow key={id} className="hover:cursor-pointer hover:bg-gray-50">
                  <TableCell className="p-5 text-custom-300">{(index + 1).toFixed(1)}</TableCell>
                  <TableCell className="p-5 text-custom-300">{description}</TableCell>
                  <TableCell className="p-5 text-custom-300">{stocks.toFixed(2)}</TableCell>
                  <TableCell className="p-5 text-custom-300">{uom}</TableCell>
                  <TableCell className="p-5 text-custom-300">{unitPrice}</TableCell>
                  <TableCell className="p-5 text-custom-300">{totalCost}</TableCell>
                  <TableCell className="p-5 text-custom-300">{location}</TableCell>
                  <TableCell className="p-5 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-7 w-7 rounded-full hover:bg-custom-100">
                          <EllipsisIcon className="h-5 w-5 text-custom-200" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Action A</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Action B</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
