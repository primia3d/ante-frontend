import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/Table';
import { useToast } from '@/components/Toaster';
import { inventoryHeader, inventoryItems } from '@/pages/home/asset-management/Inventory';
import { TInventory } from '@/types/assetManagement';
import { useAtom } from 'jotai';
import { PlusIcon, Trash2Icon, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { inventoryAtom } from '../assetManagementAtom';
import { AddItemRow } from './AddItemRow';

type AddInventoryItemProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function AddInventoryItem({ isOpen, setIsOpen }: AddInventoryItemProps) {
  const { toast } = useToast();
  const [rowData, setRowData] = useState<TInventory[]>(inventoryItems);
  const [inventory, setInventory] = useAtom(inventoryAtom);

  const inventoryData: TInventory[] = [
    {
      id: nanoid(),
      itemNumber: inventory.length + 1,
      description: '',
      location: '',
      stocks: 0,
      totalCost: 0,
      unitPrice: 0,
      uom: '',
    },
  ];

  const handleAddRow = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: nanoid(),
        itemNumber: prev.length > 0 ? prev[prev.length - 1].itemNumber + 1 : 1,
        description: '',
        location: '',
        stocks: 0,
        totalCost: 0,
        unitPrice: 0,
        uom: '',
      },
    ]);
  };

  const handleDeleteRow = () => {
    setRowData((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    try {
      setInventory((prev) => [...prev, ...rowData]);
      setIsOpen(false);
      toast({
        description: 'New Warehouse has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'Oops! something went wrong',
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    }
  };

  const handleRowDataChange = useCallback((index: number, field: keyof TInventory, value: any) => {
    setRowData((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRowData(inventoryData);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent variant="top" className="xl:max-w-[60dvw]">
        <DialogHeader className="relative h-auto px-8 py-5">
          <DialogTitle className="h-auto text-xl">Add an Item</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="absolute right-4 top-4 h-6 w-6 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="overflow-x-hidden">
          <div className="max-h-[40rem] overflow-auto">
            <Table className="">
              <TableHeader>
                <TableRow className="border-none bg-custom-100">
                  {inventoryHeader.slice(0, -1).map((item) => (
                    <TableHead key={item} className="p-5 font-bold text-custom-300">
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border-b">
                {rowData.map((row, index) => (
                  <AddItemRow
                    key={row.id}
                    itemNumber={row.itemNumber}
                    description={row.description}
                    location={row.location}
                    stocks={row.stocks}
                    totalCost={row.totalCost}
                    unitPrice={row.unitPrice}
                    uom={row.uom}
                    onDescriptionChange={(value) => handleRowDataChange(index, 'description', value)}
                    onLocationChange={(value) => handleRowDataChange(index, 'location', value)}
                    onStocksChange={(value) => handleRowDataChange(index, 'stocks', value)}
                    onTotalCostChange={(value) => handleRowDataChange(index, 'totalCost', value)}
                    onUnitPriceChange={(value) => handleRowDataChange(index, 'unitPrice', value)}
                    onUomChange={(value) => handleRowDataChange(index, 'uom', value)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="my-5 flex items-center gap-4 px-4">
            <Button variant={'primary'} onClick={handleAddRow}>
              <PlusIcon className="h-5 w-5" />
              Add More
            </Button>
            {rowData.length > 1 && (
              <Button variant={'destructive'} onClick={handleDeleteRow}>
                <Trash2Icon className="h-5 w-5" />
                Remove
              </Button>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 p-8">
            <Button
              type="button"
              className="h-10 rounded-lg xl:w-40"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" className="h-10 rounded-lg xl:w-40" variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
