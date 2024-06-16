import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader } from '@/components/Dialog';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { cn } from '@/utils/cn';
import { DialogTitle } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type NodeFormProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSubmit: (label: string) => void;
  mode: 'add' | 'edit';
  initialLabel?: string;
};

export function NodeForm({ isOpen, setIsOpen, onSubmit, mode, initialLabel = '' }: NodeFormProps) {
  const [label, setLabel] = useState(initialLabel);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(label);
    setLabel('');
  };

  useEffect(() => {
    if (isOpen) {
      setLabel(initialLabel);
    }
  }, [isOpen, initialLabel]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold capitalize">
            {mode === 'add' ? 'Add Node' : 'Edit Node'}
          </DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="absolute right-5 top-5 h-6 w-6 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="relative">
            <Label className={cn('font-bold capitalize leading-7 text-custom-300')}>Node Label</Label>
            <Textarea
              placeholder="Enter node label..."
              className={cn(
                'resize-none rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
              )}
              cols={1}
              rows={5}
              required
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              className="h-10 w-1/3 rounded-lg"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-10 w-1/3 rounded-lg" variant="primary">
              {mode === 'add' ? 'Add Node' : 'Edit Node'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
