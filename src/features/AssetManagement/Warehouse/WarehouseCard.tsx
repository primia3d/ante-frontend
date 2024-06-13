import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { CustomIcon } from '@/features/CustomIcon';
import { EllipsisIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '@/api/warehouse/getWarehouseList';
import { TViewWarehouse } from '@/types/warehouseList';

type WarehouseCardProps = {
  id: string;
  name: string;
  location: string;
  size: number;
};

export function WarehouseCard({ id }: WarehouseCardProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => fetchWarehouses({ page: 1, perPage: 10 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <ul>
      {data &&
        data.map((warehouse: TViewWarehouse) => (
          <li key={warehouse.id} className="">
            <Card className="relative border-none shadow-none transition duration-300 hover:-translate-y-[10px] hover:cursor-pointer hover:shadow">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="absolute right-3 top-3 h-7 w-7 rounded-full hover:bg-custom-100"
                >
                  <Button>
                    <EllipsisIcon className="h-5 w-5 text-custom-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuItem>Action A</DropdownMenuItem>
                  <DropdownMenuItem>Action B</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to={`/asset-management/warehouse/${warehouse.id}`}>
                <CardContent className="space-y-2.5 p-8">
                  <h2 className="text-lg font-bold text-custom-400">{warehouse.name}</h2>
                  <p className="text-custom-300">{warehouse.location}</p>
                  <p className="flex items-center gap-2 text-custom-300">
                    <CustomIcon variant="warehouse" className="text-custom-200" />
                    {warehouse.size} sqm.
                  </p>
                </CardContent>
              </Link>
            </Card>
          </li>
        ))}
    </ul>
  );
}
