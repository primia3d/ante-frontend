import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { inventoryHeader } from '@/pages/home/asset-management/Inventory';
import { X } from 'lucide-react';

type AddInventoryItemProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function AddInventoryItem({ isOpen, setIsOpen }: AddInventoryItemProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent variant="top" className="sm:max-w-[90dvh]">
        <DialogHeader className="px-8 py-5">
          <DialogTitle className="text-xl">Add an Item</DialogTitle>
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
        <div className="h-96 overflow-x-auto">
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
              <TableRow>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
                <TableCell className="p-5 text-custom-300">aaa</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
