import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Edit, Plus, SearchIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ScopeList } from '../Scope';

import { getRoleByGroup } from '@/api/role/getRoleByGroup';
import { getRoleGroupDropdownList } from '@/api/roleGroup/getRoleGroupDropdownList';
import { getScopeTreeByRole } from '@/api/scope/getScopeTreeByRole';
import { Button } from '@/components/Button';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { useBoolean } from '@/hooks/useBoolean';
import { roleFormSchema } from '@/schema/roleSchema';
import { TRoleFormSchema } from '@/types/role';
import { cn } from '@/utils/cn';

export type RoleFormProps = {
  variant: 'create' | 'edit' | 'add';
  values?: TRoleFormSchema;
  onSubmit: (values: TRoleFormSchema) => void | Promise<void>;
  parentRoleId?: string;
  roleGroupId?: string;
};

const defaultValues: TRoleFormSchema = {
  description: '',
  name: '',
  scopeIDs: [],
  placement: 'above',
  select: '',
  roleGroupId: '',
  parentRoleId: '',
};

function renderButton(variant: 'create' | 'edit' | 'add') {
  switch (variant) {
    case 'edit':
      return (
        <Button variant="secondary" className="h-8 font-normal">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      );
    case 'create':
      return (
        <Button variant="primary">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      );
    case 'add':
      return (
        <Button className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full border bg-primary-100 text-white hover:bg-primary-100/90">
          <Plus className="h-4 w-4" />
        </Button>
      );
    default:
      return null;
  }
}

export function RoleForm({ variant, onSubmit, values = defaultValues, parentRoleId, roleGroupId }: RoleFormProps) {
  // const [search, setSearch] = useState('');
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);
  const [roleGroupIdValue, setRoleGroupIdValue] = useState(roleGroupId || '');
  const [roleParentIdValue, setRoleParentIdValue] = useState(parentRoleId || '');

  useEffect(() => {
    if (isFormOpen) {
      setRoleGroupIdValue(roleGroupId || '');
      setRoleParentIdValue(parentRoleId || '');
    }
  }, [isFormOpen, roleGroupId, parentRoleId]);

  const { data: roleByGroupData = [] } = useQuery({
    queryKey: ['getRoleByGroup', roleGroupIdValue],
    queryFn: () => getRoleByGroup({ id: roleGroupIdValue }),
    enabled: !!roleGroupIdValue,
  });

  const { data: scopeByRoleData = [] } = useQuery({
    queryKey: ['getScopeTreeByRole', roleParentIdValue],
    queryFn: () => getScopeTreeByRole({ id: roleParentIdValue }),
  });

  const { data: roleGroupDropdownList = [] } = useQuery({
    queryKey: ['getRoleGroupDropdownList'],
    queryFn: () => getRoleGroupDropdownList(),
  });

  const form = useForm<TRoleFormSchema>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: values,
  });

  const handleSubmit = async (data: typeof values) => {
    setIsFormOpen(false);
    await onSubmit(data);
  };

  useEffect(() => {
    const updatedValues = {
      ...values,
      roleGroupId: roleGroupId || '',
      parentRoleId: parentRoleId || '',
    };
    form.reset(updatedValues);
  }, [form, isFormOpen, values, roleGroupId, parentRoleId]);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>{renderButton(variant)}</DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>
            {variant === 'create' && <>Create Role</>}
            {variant === 'edit' && <>Edit Role</>}
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
                  <FormField
                    control={form.control}
                    name="roleGroupId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.roleGroupId && 'text-rose-500',
                              )}
                            >
                              Role Group
                            </FormLabel>
                            <div className="mt-2">
                              <select
                                value={field.value}
                                onChange={(e) => {
                                  const { value } = e.target;
                                  field.onChange(value);
                                  setRoleGroupIdValue(value);
                                }}
                                className="h-11 w-full rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                disabled={!!roleGroupId}
                              >
                                <option value="" disabled>
                                  Select a Role Group
                                </option>
                                {roleGroupDropdownList.map((roleGroup) => (
                                  <option key={roleGroup.id} value={roleGroup.id}>
                                    {roleGroup.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentRoleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FormLabel
                              className={cn(
                                'font-bold capitalize leading-7 text-custom-300',
                                form.formState.errors.parentRoleId && 'text-rose-500',
                              )}
                            >
                              Role Parent
                            </FormLabel>
                            <div className="mt-2">
                              <select
                                value={field.value}
                                onChange={(e) => {
                                  const { value } = e.target;
                                  field.onChange(value);
                                  setRoleParentIdValue(value);
                                }}
                                className="h-11 w-full rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                disabled={
                                  !roleGroupIdValue || !roleByGroupData || !roleByGroupData.length || !!parentRoleId
                                }
                              >
                                <option value="" disabled>
                                  Select a Parent Role
                                </option>
                                {roleByGroupData?.map((role) => (
                                  <option key={role.id} value={role.id}>
                                    {role.name}
                                  </option>
                                ))}
                              </select>
                              {!roleByGroupData ||
                                (roleByGroupData.length === 0 && (
                                  <div className="text-center text-custom-300">
                                    No Roles Available for this Role Group
                                  </div>
                                ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            <section>
              <h3 className="mb-5 text-base font-semibold">Access</h3>
              <div className="space-y-5 rounded-md border p-5">
                <div className="relative w-full">
                  <Input
                    placeholder="Search..."
                    className="h-9 w-full bg-white pl-8"
                    // onChange={(event) => setSearch(event.currentTarget.value)}
                  />
                  <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>
                <FormField
                  control={form.control}
                  name="scopeIDs"
                  render={({ field }) => (
                    <FormItem className="max-h-[300px] max-w-xs overflow-auto sm:max-w-full [&>*]:truncate">
                      <ScopeList scopes={scopeByRoleData} field={field} />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            <div className="flex items-center justify-center gap-2">
              <ConfirmDialog
                title="Role"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to cancel creation of new role?'
                    : 'Are you sure you want to cancel editing this role?'
                }
                label="Cancel"
                type="cancel"
                handleReset={() => setIsFormOpen(false)}
                className="w-full"
              />
              <ConfirmDialog
                title="Role"
                message={
                  variant === 'create'
                    ? 'Are you sure you want to create this role?'
                    : 'Are you sure you want to save these new role?'
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
