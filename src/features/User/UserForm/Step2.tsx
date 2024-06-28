import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { getRoleList } from '@/api/role';
import { getParentUserList } from '@/api/user/getParentUserList';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { TUserFormSchema } from '@/types/user';
import { cn } from '@/utils/cn';

export function Step2() {
  const form = useFormContext<TUserFormSchema>();


  const { data: { list: roles = [] } = {} } = useQuery({
    enabled: true,
    queryKey: ['getRoleList'],
    queryFn: () => getRoleList(),
  });

  
  const { data: parentUsers = [] } = useQuery({
    enabled: !!form.watch('roleID'), 
    queryKey: ['getParentUserList', form.watch('roleID')],
    queryFn: () => getParentUserList(form.watch('roleID')),
  });

  return (
    <section className="my-5 flex flex-col items-center gap-3">
      <div className="w-full space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.username && 'text-rose-500',
                    )}
                  >
                    Username
                  </FormLabel>
                  <Input
                    placeholder="Enter username..."
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.username && 'border-rose-500',
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.password && 'text-rose-500',
                    )}
                  >
                    Password
                  </FormLabel>
                  <Input
                    placeholder="Enter password..."
                    type="password"
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.password && 'border-rose-500',
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
          name="roleID"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.roleID && 'text-rose-500',
                        )}
                      >
                        Role Id
                      </FormLabel>
                      <SelectTrigger
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                          form.formState.errors.roleID && 'border-rose-500',
                        )}
                      >
                        <SelectValue placeholder="Select role id..." />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent className="z-[60]">
                    {roles.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
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
          name="parentAccountId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.parentAccountId && 'text-rose-500',
                        )}
                      >
                        Parent User
                      </FormLabel>
                      <SelectTrigger
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                          form.formState.errors.parentAccountId && 'border-rose-500',
                        )}
                      >
                        <SelectValue placeholder="Select parent user..." />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent className="z-[60]">
                    {parentUsers.map(({ id, firstName, lastName }) => (
                      <SelectItem key={id} value={id}>
                        {firstName} {lastName}
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
    </section>
  );
}
