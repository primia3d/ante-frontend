import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Edit, Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import { capitalize } from 'lodash';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { useBoolean } from '@/hooks/useBoolean';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { cn } from '@/utils/cn';
import { scopeFormSchema } from '@/schema/scopeSchema';
import { TScopeFormSchema } from '@/types/scope';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/Select';
import { Textarea } from '@/components/Textarea';

export type ScopeFormProps = {
  variant: 'create' | 'edit';
  values?: TScopeFormSchema;
  onSubmit: (values: TScopeFormSchema) => void | Promise<void>;
};

const defaultValues: TScopeFormSchema = {
  id: '',
  type: 'PAGE',
  name: '',
  description: '',
};

export function ScopeForm({ values = defaultValues, onSubmit, variant }: ScopeFormProps) {
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);

  const form = useForm<TScopeFormSchema>({
    resolver: zodResolver(scopeFormSchema),
    defaultValues: values,
  });

  const handleSubmit = async (data: typeof values) => {
    setIsFormOpen(false);
    await onSubmit(data);
  };

  useEffect(() => {
    form.reset(values);
  }, [form, isFormOpen, values]);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant === 'edit' ? 'secondary' : 'primary'}
          className={cn(variant === 'edit' && 'h-8 font-normal')}
        >
          {variant === 'create' && (
            <>
              <Plus className="h-4 w-4" />
              Create Scope
            </>
          )}
          {variant === 'edit' && (
            <>
              <Edit className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>
            {variant === 'create' && 'Create Scope'}
            {variant === 'edit' && 'Edit Scope'}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-6 w-6 -translate-y-0.5 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 p-5 sm:p-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.id && 'text-rose-500',
                        )}
                      >
                        Id
                      </FormLabel>
                      <Input
                        readOnly={variant === 'edit'}
                        placeholder="Enter id..."
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.id && 'border-rose-500',
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <FormLabel
                            className={cn(
                              'font-bold capitalize leading-7 text-custom-300',
                              form.formState.errors.type && 'text-rose-500',
                            )}
                          >
                            Type
                          </FormLabel>

                          <SelectTrigger
                            className={cn(
                              'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                              form.formState.errors.type && 'border-rose-500',
                            )}
                          >
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="z-[60]">
                        {['PAGE', 'FEATURE', 'ACTION', 'WIDGET'].map((type) => (
                          <SelectItem key={type} value={type}>
                            {capitalize(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.name && 'text-rose-500',
                        )}
                      >
                        Name
                      </FormLabel>
                      <Input
                        placeholder="Enter name..."
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.name && 'border-rose-500',
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.description && 'text-rose-500',
                        )}
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        placeholder="Enter description..."
                        {...field}
                        className={cn(
                          'resize-none rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                          form.formState.errors.description && 'border-rose-500',
                        )}
                        cols={1}
                        rows={10}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-2">
              <ConfirmDialog
                title="Scope"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to cancel creation of new scope?'
                    : 'Are you sure you want to cancel editing this scope?'
                }
                label="Cancel"
                type="cancel"
                handleReset={() => setIsFormOpen(false)}
                className="w-full"
              />
              <ConfirmDialog
                title="Scope"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to create this scope?'
                    : 'Are you sure you want to save these new changes?'
                }
                label={variant === 'create' ? 'Create' : 'Save'}
                type="submit"
                handleSubmit={form.handleSubmit(handleSubmit)}
                className="w-full bg-primary-100 hover:bg-blue-600"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
