import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { CustomIcon } from '@/features/CustomIcon';
import { EllipsisIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type WarehouseCardProps = {
  id: string;
  name: string;
  location: string;
  size: number;
};

export function WarehouseCard({ id, name, location, size }: WarehouseCardProps) {
  return (
    <li>
      <Card className="relative border-none shadow-none transition duration-300 hover:-translate-y-[10px] hover:cursor-pointer hover:shadow">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="absolute right-3 top-3 h-7 w-7 rounded-full hover:bg-custom-100">
            <Button>
              <EllipsisIcon className="h-5 w-5 text-custom-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Action A</DropdownMenuItem>
            <DropdownMenuItem>Action B</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to={`/asset-management/warehouse/${id}`}>
          <CardContent className="space-y-2.5 p-8">
            <h2 className="text-lg font-bold text-custom-400">{name}</h2>
            <p className="text-custom-300">{location}</p>
            <p className="flex items-center gap-2 text-custom-300">
              <CustomIcon variant="warehouse" className="text-custom-200" />
              {size} sqm.
            </p>
          </CardContent>
        </Link>
      </Card>
    </li>
  );
}
