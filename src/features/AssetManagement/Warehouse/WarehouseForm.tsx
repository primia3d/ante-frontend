import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { useBoolean } from '@/hooks/useBoolean';
import { warehouseFormSchema } from '@/schema/warehouseSchema';
import { TWarehouseFormSchema } from '@/types/assetManagement';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createWarehouse } from '@/api/warehouse/createWarehouse';
import { useToast } from '@/components/Toaster';
import { useMutation } from '@tanstack/react-query';

export type WarehouseFormProps = {
  values?: TWarehouseFormSchema;
  variant: 'create' | 'edit';
  button: JSX.Element;
  onSubmit: (data: TWarehouseFormSchema) => Promise<void>;
};

const defaultValues: TWarehouseFormSchema = {
  warehouseName: '',
  warehouseLocation: '',
  warehouseSize: 0,
  warehouseCapacity: 0,
};

export function WarehouseForm({ values = defaultValues, variant, button, onSubmit }: WarehouseFormProps) {
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);

  const form = useForm<TWarehouseFormSchema>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: values,
  });

  const { toast } = useToast();
  const createWarehouseMutation = useMutation({
    mutationFn: createWarehouse,
  });

  const handleSubmit = async (data: TWarehouseFormSchema) => {
    setIsFormOpen(false);
    if (variant === 'create') {
      try {
        await createWarehouseMutation.mutateAsync({
          name: data.warehouseName,
          location: data.warehouseLocation,
          size: data.warehouseSize,
          storageCapacity: data.warehouseCapacity,
        });
        toast({
          description: 'Warehouse successfully created!',
          className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
          duration: 3000,
        });
      } catch (error) {
        console.error('Failed to create warehouse:', error);
      }
    } else {
      await onSubmit(data);
    }
  };

  useEffect(() => {
    form.reset(values);
  }, [form, isFormOpen, values]);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent variant="top">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 p-5 sm:p-8">
            <h2 className="text-xl font-bold capitalize">{variant === 'create' ? 'Add New' : 'Edit'} Warehouse</h2>
            <FormField
              control={form.control}
              name="warehouseName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.warehouseName && 'text-rose-500',
                        )}
                      >
                        Warehouse Name
                      </FormLabel>
                      <Input
                        placeholder="Enter warehouse name..."
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.warehouseName && 'border-rose-500',
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warehouseLocation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.warehouseLocation && 'text-rose-500',
                        )}
                      >
                        Warehouse Location
                      </FormLabel>
                      <Input
                        placeholder="Enter warehouse location..."
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.warehouseLocation && 'border-rose-500',
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="warehouseSize"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.warehouseSize && 'text-rose-500',
                          )}
                        >
                          Warehouse Size
                        </FormLabel>
                        <Input
                          type="number"
                          placeholder="sqm."
                          min={0}
                          className={cn(
                            'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                            form.formState.errors.warehouseSize && 'border-rose-500',
                          )}
                          {...field}
                          onChange={(value) => field.onChange(value.target.valueAsNumber)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warehouseCapacity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.warehouseCapacity && 'text-rose-500',
                          )}
                        >
                          Warehouse Capacity
                        </FormLabel>
                        <Input
                          type="number"
                          placeholder="lbs."
                          min={0}
                          className={cn(
                            'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                            form.formState.errors.warehouseCapacity && 'border-rose-500',
                          )}
                          {...field}
                          onChange={(value) => field.onChange(value.target.valueAsNumber)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                className="h-10 w-1/3 rounded-lg"
                variant="secondary"
                onClick={() => setIsFormOpen(false)}
              >
                Back
              </Button>
              <Button type="submit" className="h-10 w-1/3 rounded-lg" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
