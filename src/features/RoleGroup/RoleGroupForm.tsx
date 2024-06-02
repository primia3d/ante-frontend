import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Edit, Plus, X } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { useBoolean } from '@/hooks/useBoolean';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Textarea } from '@/components/Textarea';
import { roleGroupFormSchema } from '@/schema/roleGroupSchema';
import { TRoleGroupFormSchema } from '@/types/roleGroup';
import { cn } from '@/utils/cn';

export type RoleGroupFormProps = {
  variant: 'create' | 'edit';
  values?: TRoleGroupFormSchema;
  onSubmit: (values: TRoleGroupFormSchema) => void | Promise<void>;
};

const defaultValues: TRoleGroupFormSchema = {
  description: '',
  name: '',
};

export function RoleGroupForm({ variant, onSubmit, values = defaultValues }: RoleGroupFormProps) {
  // const [search, setSearch] = useState('');
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);
  // const { data: scopes = [] } = useQuery({
  //   enabled: isFormOpen,
  //   queryKey: ['getScopeList'],
  //   queryFn: () => getScopeList(),
  // });

  const form = useForm<TRoleGroupFormSchema>({
    resolver: zodResolver(roleGroupFormSchema),
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
          {variant === 'edit' ? (
            <>
              <Edit className="h-4 w-4" />
              Edit
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Create Role Group
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>
            {variant === 'create' && <>Create Role Group</>}
            {variant === 'edit' && <>Edit Role Group</>}
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 p-5 sm:p-8">
            <section>
              <h3 className="mb-5 text-base font-semibold">Details</h3>
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div className="flex h-full w-full flex-col justify-between gap-5">
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
                              placeholder="Name"
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
                              placeholder="Description"
                              className={cn(
                                'w-full resize-none rounded-lg border-2 border-custom-100 bg-custom-50 p-3 placeholder:text-custom-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                form.formState.errors.description && 'border-rose-500',
                              )}
                              cols={1}
                              rows={5}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            <div className="flex items-center justify-center gap-2">
              <ConfirmDialog
                title="Role Group"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to cancel creation of new role group?'
                    : 'Are you sure you want to cancel editing this role group?'
                }
                label="Cancel"
                type="cancel"
                handleReset={() => setIsFormOpen(false)}
                className="w-full"
              />
              <ConfirmDialog
                title="Role Group"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to create this role group?'
                    : 'Are you sure you want to save these new role? group'
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
