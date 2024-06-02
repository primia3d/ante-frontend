import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { DueDatePicker } from '../Dashboard/Tasks/DueDatePicker';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Separator } from '@/components/Separator';
import { Textarea } from '@/components/Textarea';
import { useBoolean } from '@/hooks/useBoolean';
import { projectFormSchema } from '@/schema/projectSchema';
import { TProjectFormSchema } from '@/types/projects';
import { cn } from '@/utils/cn';

export type ProjectFormProps = {
  values?: TProjectFormSchema;
  variant: 'create' | 'edit';
  button: JSX.Element;
  onSubmit: (data: TProjectFormSchema) => Promise<void>;
};

const defaultValues: TProjectFormSchema = {
  name: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  budget: 0,
  status: 'PROJECT',
  clientInformation: {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    contactNumber: '',
  },
};

export function ProjectForm({ values = defaultValues, variant, button, onSubmit }: ProjectFormProps) {
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);

  const form = useForm<TProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: values,
  });

  const handleSubmit = async (data: TProjectFormSchema) => {
    setIsFormOpen(false);
    await onSubmit(data);
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
            <h2 className="text-xl font-bold capitalize">{variant === 'create' ? 'Create New' : 'Edit'} Project</h2>
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
                        Project Name
                      </FormLabel>
                      <Input
                        placeholder="Enter project name..."
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
                        Project Description
                      </FormLabel>
                      <Textarea
                        placeholder="Add description..."
                        {...field}
                        className={cn(
                          'resize-none rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                          form.formState.errors.description && 'border-rose-500',
                        )}
                        cols={1}
                        rows={5}
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
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.startDate && 'text-rose-500',
                          )}
                        >
                          Start Date
                        </FormLabel>
                        <div className="relative">
                          <DueDatePicker
                            {...field}
                            className={`${form.formState.errors.startDate ? 'border-rose-500' : ''}`}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.endDate && 'text-rose-500',
                          )}
                        >
                          End Date
                        </FormLabel>
                        <div className="relative">
                          <DueDatePicker
                            {...field}
                            className={`${form.formState.errors.endDate ? 'border-rose-500' : ''}`}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.budget && 'text-rose-500',
                          )}
                        >
                          Budget
                        </FormLabel>
                        <Input
                          type="number"
                          placeholder="Enter budget..."
                          className={cn(
                            'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                            form.formState.errors.budget && 'border-rose-500',
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
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.status && 'text-rose-500',
                              )}
                            >
                              Status
                            </FormLabel>

                            <SelectTrigger
                              className={cn(
                                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                                form.formState.errors.status && 'border-rose-500',
                              )}
                            >
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className="z-[60]">
                          {['PROJECT', 'LEAD'].map((item) => (
                            <SelectItem key={item} value={item}>
                              {capitalize(item)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {variant === 'create' && (
              <>
                <Separator />
                <h3 className="text-base font-bold capitalize">Client Information</h3>
                <div className="flex items-center gap-3">
                  <FormField
                    control={form.control}
                    name="clientInformation.firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.clientInformation?.firstName && 'text-rose-500',
                              )}
                            >
                              First Name
                            </FormLabel>
                            <Input
                              placeholder="Enter first name..."
                              className={cn(
                                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                                form.formState.errors.clientInformation?.firstName && 'border-rose-500',
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
                    name="clientInformation.lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.clientInformation?.lastName && 'text-rose-500',
                              )}
                            >
                              Last Name
                            </FormLabel>
                            <Input
                              placeholder="Enter last name..."
                              className={cn(
                                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                                form.formState.errors.clientInformation?.lastName && 'border-rose-500',
                              )}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FormField
                    control={form.control}
                    name="clientInformation.email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.clientInformation?.email && 'text-rose-500',
                              )}
                            >
                              Email
                            </FormLabel>
                            <Input
                              type="email"
                              placeholder="Enter email..."
                              className={cn(
                                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                                form.formState.errors.clientInformation?.email && 'border-rose-500',
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
                    name="clientInformation.contactNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.clientInformation?.contactNumber && 'text-rose-500',
                              )}
                            >
                              Contact Number
                            </FormLabel>
                            <Input
                              placeholder="Enter contact number..."
                              className={cn(
                                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                                form.formState.errors.clientInformation?.contactNumber && 'border-rose-500',
                              )}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="clientInformation.address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <FormLabel
                            className={cn(
                              'font-bold capitalize leading-7 text-custom-300',
                              form.formState.errors.clientInformation?.address && 'text-rose-500',
                            )}
                          >
                            Address
                          </FormLabel>
                          <Input
                            placeholder="Enter address..."
                            className={cn(
                              'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                              form.formState.errors.clientInformation?.address && 'border-rose-500',
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                className="h-10 w-full rounded-lg"
                variant="secondary"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 w-full rounded-lg" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
