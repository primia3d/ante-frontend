import { X } from 'lucide-react';

import { Button } from '../Button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog';

import { useBoolean } from '@/hooks/useBoolean';
import { cn } from '@/utils/cn';

type ConfirmDialogProps = {
  title: string;
  label?: string;
  message: string;
  type?: 'cancel' | 'submit' | 'button';
  handleReset?: () => void;
  handleSubmit?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export function ConfirmDialog({
  title,
  message,
  handleReset,
  type,
  label,
  handleSubmit,
  className,
  icon,
}: ConfirmDialogProps) {
  const { value: isConfirmDialogOpen, set: setIsConfirmDialogOpen } = useBoolean(false);

  return (
    <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn('h-10 rounded-lg', className)}
          variant={type && (type === 'cancel' ? 'secondary' : 'primary')}
        >
          {icon}
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm overflow-y-auto rounded-xl border-none bg-white text-[13px]">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-6 w-6 -translate-y-0.5 bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-6 p-6">
          <p className="text-center">{message}</p>
          <DialogFooter className="flex w-full flex-row items-center justify-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="primary"
                className="w-full"
                type={type === 'cancel' ? 'button' : type}
                onClick={type === 'cancel' ? handleReset : handleSubmit}
              >
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
