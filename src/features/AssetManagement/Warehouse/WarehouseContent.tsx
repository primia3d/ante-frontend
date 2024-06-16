import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { EllipsisIcon } from 'lucide-react';

import { fetchWarehouses } from '@/api/warehouse/getWarehouseList';
import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { warehouseViewAtom } from '../assetManagementAtom';
import { WarehouseCard } from './WarehouseCard';

export function WarehouseContent() {
  const [warehouseView] = useAtom(warehouseViewAtom);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => fetchWarehouses({ page: 1, perPage: 10 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (warehouseView === 'card') {
    return (
      <ul className="grid h-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(100%,1fr))] gap-5 xs:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
        {data &&
          data.map(({ id, location, name, size }) => (
            <WarehouseCard key={id} id={id} location={location} name={name} size={size} />
          ))}
        {!data && <p>No warehouse found.</p>}
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
          {data &&
            data.map(({ capacity, id, location, name, size }) => (
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
          {!data && <p>No warehouse found.</p>}
        </TableBody>
      </Table>
    </div>
  );
}
