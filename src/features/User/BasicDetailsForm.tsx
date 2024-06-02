import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn } from '@/utils/cn';

type BasicDetailsFormProps = {
  form: UseFormReturn<
    {
      address: string;
      firstName: string;
      lastName: string;
      email: string;
      contactNumber: string;
      userName: string;
      password: string;
      role: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {
      address: string;
      firstName: string;
      lastName: string;
      email: string;
      contactNumber: string;
      userName: string;
      password: string;
      role: string;
    }
  >;
};

export default function BasicDetailsForm({ form }: BasicDetailsFormProps) {
  return (
    <section className="px-10">
      <div className="flex flex-col items-center gap-5">
        <div className="mt-5">
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
        <div className="flex h-full w-full flex-col justify-between gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First name"
                    type="text"
                    {...field}
                    className={cn(
                      'peer w-full placeholder:text-transparent focus:border-blue-300',
                      form.formState.errors.firstName && 'border-rose-500',
                    )}
                  />
                </FormControl>
                <FormLabel className="absolute -top-[1px] left-0 ml-2 -translate-y-4 cursor-text bg-white px-1 text-xs font-medium duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:ml-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-xs">
                  First name
                </FormLabel>
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
                  <Input
                    placeholder="Last name"
                    type="text"
                    {...field}
                    className={cn(
                      'peer w-full placeholder:text-transparent focus:border-blue-300',
                      form.formState.errors.lastName && 'border-rose-500',
                    )}
                  />
                </FormControl>
                <FormLabel className="absolute -top-[1px] left-0 ml-2 -translate-y-4 cursor-text bg-white px-1 text-xs font-medium duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:ml-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-xs">
                  Last name
                </FormLabel>
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
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className={cn(
                      'peer w-full placeholder:text-transparent focus:border-blue-300',
                      form.formState.errors.email && 'border-rose-500',
                    )}
                  />
                </FormControl>
                <FormLabel className="absolute -top-[1px] left-0 ml-2 -translate-y-4 cursor-text bg-white px-1 text-xs font-medium duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:ml-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-xs">
                  Email
                </FormLabel>
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
                  <Input
                    placeholder="Contact number"
                    type="tel"
                    {...field}
                    className={cn(
                      'peer w-full placeholder:text-transparent focus:border-blue-300',
                      form.formState.errors.contactNumber && 'border-rose-500',
                    )}
                  />
                </FormControl>
                <FormLabel className="absolute -top-[1px] left-0 ml-2 -translate-y-4 cursor-text bg-white px-1 text-xs font-medium duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:ml-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-xs">
                  Contact number
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Address"
                    type="text"
                    {...field}
                    className={cn(
                      'peer w-full placeholder:text-transparent focus:border-blue-300',
                      form.formState.errors.address && 'border-rose-500',
                    )}
                  />
                </FormControl>
                <FormLabel className="absolute -top-[1px] left-0 ml-2 -translate-y-4 cursor-text bg-white px-1 text-xs font-medium duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:ml-2 peer-focus:-translate-y-4 peer-focus:px-1 peer-focus:text-xs">
                  Address
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
}
