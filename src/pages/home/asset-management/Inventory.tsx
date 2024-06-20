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
import {
  AddInventoryItem,
  assetManagementTabAtom,
  inventoryAtom,
  inventoryCurrentPageAtom,
  inventoryPageSizeAtom,
} from '@/features/AssetManagement';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { TInventory } from '@/types/assetManagement';
import { cn } from '@/utils/cn';
import { useAtom } from 'jotai';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon, EllipsisVerticalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getVariantList } from '@/api/inventory/getVariantInventory';
import { useParams } from 'react-router-dom';

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
    id: '',
    itemNumber: 1,
    variationName: '',
    variationDescription: '',
    stocks: 50,
    unitOfMeasure: 'pc.',
    unitPrice: 0,
    total: 0,
    location: 'main warehouse',
  },
];

export default function Inventory() {
  const { id } = useParams<{ id?: string }>();

  const [, setTab] = useAtom(assetManagementTabAtom);
  const [inventory, setInventory] = useState<TInventory[]>([]);

  const [currentPage, setCurrentPage] = useAtom(inventoryCurrentPageAtom);
  const [pageSize] = useAtom(inventoryPageSizeAtom);

  const { value: isAddItemOpen, set: setIsAddItemOpen } = useBoolean(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const fetchInventory = async (id: string) => {
    try {
      const data = await getVariantList({ page: currentPage, perPage: pageSize, generalInventoryId: id });
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory: ', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInventory(id);
    }
  }, [currentPage, pageSize, id]);

  const filteredInventory = inventory.filter(
    (item) =>
      item.variationDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredInventory.length / pageSize);
  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedFixtures = filteredInventory.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

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
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
                Edit Inventory
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
                Accept Item
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
                Request for Delivery
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
                Delivery History
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
                Request for Purchase
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={() => setIsAddItemOpen(true)}>
                Add Item
              </DropdownMenuItem>
              <DropdownMenuItem className="px-5 py-3 text-custom-300" onClick={(e) => e.stopPropagation()} disabled>
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
              value={searchQuery}
              onChange={handleSearch}
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
              {displayedFixtures.map(
                ({ variationDescription, id, location, stocks, total, unitPrice, unitOfMeasure }, index) => (
                  <TableRow key={id} className="hover:cursor-pointer hover:bg-gray-50">
                    <TableCell className="p-5 text-custom-300">{(index + 1).toFixed(1)}</TableCell>
                    <TableCell className="p-5 text-custom-300">{variationDescription}</TableCell>
                    <TableCell className="p-5 text-custom-300">{stocks.toFixed(2)}</TableCell>
                    <TableCell className="p-5 text-custom-300">{unitOfMeasure}</TableCell>
                    <TableCell className="p-5 text-custom-300">{unitPrice}</TableCell>
                    <TableCell className="p-5 text-custom-300">{total}</TableCell>
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
                ),
              )}
              {!filteredInventory.length && (
                <p className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-center text-base text-custom-300">
                  No items found.
                </p>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center gap-1 py-5">
          {canGoToPrevious && (
            <Button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded bg-custom-100 hover:bg-primary-100 hover:text-white"
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          )}

          {pageNumbers.map((pageNumber) => (
            <Button
              type="button"
              key={pageNumber}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded bg-custom-100 hover:bg-primary-100 hover:text-white',
                pageNumber === currentPage && 'bg-primary-100 text-white',
              )}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
          {canGoToNext && (
            <Button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded bg-custom-100 hover:bg-primary-100 hover:text-white"
              onClick={() => goToPage(currentPage + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
