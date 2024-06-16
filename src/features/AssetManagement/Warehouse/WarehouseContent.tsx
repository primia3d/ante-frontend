import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { warehouseViewAtom } from '../assetManagementAtom';
import { WarehouseCard } from './WarehouseCard';

const warehouses = [
  {
    id: '01',
    name: 'Main Warehouse',
    location: '123 Main St., Makati City',
    size: 929,
    capacity: 10000,
  },
  {
    id: '02',
    name: 'Satellite Warehouse 1',
    location: '456 Sub St., Taguig City',
    size: 500,
    capacity: 10000,
  },
  {
    id: '03',
    name: 'Satellite Warehouse 2',
    location: '789 Sub St., Paranaque City',
    size: 450,
    capacity: 10000,
  },
];

export function WarehouseContent() {
  const [warehouseView] = useAtom(warehouseViewAtom);
  const navigate = useNavigate();

  //USE QUERY HERE

  if (warehouseView === 'card') {
    return (
      <ul className="grid h-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(100%,1fr))] gap-5 xs:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {warehouses.map(({ id, location, name, size }) => (
          <WarehouseCard key={id} id={id} location={location} name={name} size={size} />
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="">
        <TableHeader>
          <TableRow className="border-none bg-custom-100">
            <TableHead className="px-5 py-2.5 text-[15px] font-bold text-custom-300">Warehouse Name</TableHead>
            <TableHead className="px-5 py-2.5 text-[15px] font-bold text-custom-300">Warehouse Location</TableHead>
            <TableHead className="px-5 py-2.5 text-[15px] font-bold text-custom-300">Warehouse Size</TableHead>
            <TableHead className="px-5 py-2.5 text-[15px] font-bold text-custom-300">Storage Capacity</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warehouses.map(({ capacity, id, location, name, size }) => (
            <TableRow
              key={id}
              className="hover:cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/asset-management/warehouse/${id}`)}
            >
              <TableCell className="px-5 py-2.5 font-bold">{name}</TableCell>
              <TableCell className="px-5 py-2.5">{location}</TableCell>
              <TableCell className="px-5 py-2.5">{size}</TableCell>
              <TableCell className="px-5 py-2.5">{capacity}</TableCell>
              <TableCell className="px-5 py-2.5 text-center">
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
  );
}
