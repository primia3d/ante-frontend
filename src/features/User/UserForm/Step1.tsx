import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { TUserFormSchema } from '@/types/user';
import { cn } from '@/utils/cn';

type Step1Props = {
  variant: 'add' | 'edit' | 'create';
  parentUserId: string;
  setUserParentIdValue: React.Dispatch<React.SetStateAction<string>>;
};

export function Step1({ parentUserId}: Step1Props) {
  const form = useFormContext<TUserFormSchema>();

  return (
    <section className="my-5 flex flex-col items-center gap-3">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 122.88 122.88"
          className="h-40 w-40 text-gray-300"
        >
          <path d="M0 0h122.88v122.88H0V0z" fillRule="evenodd" fill="currentColor" />
          <path
            d="M48.64 77.72c.65-1.48 1.24-3.1 1.61-4.19a52.43 52.43 0 0 1-4.22-6l-4.27-6.83a12.55 12.55 0 0 1-2.43-6.21 4.94 4.94 0 0 1 .43-2.23 4.1 4.1 0 0 1 1.47-1.71 4.73 4.73 0 0 1 1-.52 107.7 107.7 0 0 1-.2-12.23 16.87 16.87 0 0 1 .55-2.8 16.39 16.39 0 0 1 7.22-9.2 22.79 22.79 0 0 1 6.05-2.69c1.37-.39-1.15-4.72.25-4.87 6.79-.7 17.77 5.5 22.51 10.62a16.63 16.63 0 0 1 4.19 10.51l-.27 11.1a3.06 3.06 0 0 1 2.25 2.32c.35 1.36 0 3.25-1.18 5.84a.37.37 0 0 1-.07.14l-4.87 8a41.6 41.6 0 0 1-6 8.24c.23.32.45.63.66.94 8.25 12.11 19.38 5.88 32.32 15.36l-.38.51v12.82H17.22V91.47h.24a1.14 1.14 0 0 1 .56-.61c8.38-4.86 27.7-6.51 30.62-13.14Z"
            fill="#FFF"
          />
        </svg>
      </div>
      <div className="w-full space-y-3">
        <div>{parentUserId}</div>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.firstName && 'text-rose-500',
                    )}
                  >
                    First name
                  </FormLabel>
                  <Input
                    placeholder="Enter first name..."
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.firstName && 'border-rose-500',
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.lastName && 'text-rose-500',
                    )}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    placeholder="Enter last name..."
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.lastName && 'border-rose-500',
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.email && 'text-rose-500',
                    )}
                  >
                    Email
                  </FormLabel>
                  <Input
                    placeholder="Enter email..."
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.email && 'border-rose-500',
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
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FormLabel
                    className={cn(
                      'font-bold capitalize leading-7 text-custom-300',
                      form.formState.errors.contactNumber && 'text-rose-500',
                    )}
                  >
                    Contact No.
                  </FormLabel>
                  <Input
                    placeholder="Enter contact number..."
                    className={cn(
                      'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                      form.formState.errors.contactNumber && 'border-rose-500',
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
    </section>
  );
}
