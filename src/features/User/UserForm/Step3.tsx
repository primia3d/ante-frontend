import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { TUserFormSchema } from '@/types/user';
import { getRoleByID } from '@/api/role';

export function Step3() {
  const form = useFormContext<TUserFormSchema>();
  const { data: role } = useQuery({
    queryKey: ['getRoleByID'],
    queryFn: () => getRoleByID({ id: form.getValues('roleID') }),
  });

  return (
    <section className="my-5 flex flex-col items-start gap-3 sm:flex-row">
      <div className="w-full">
        <h3 className="mb-4 text-base font-semibold capitalize">Basic Details</h3>
        <ul className="w-full space-y-2">
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20  font-semibold">First name:</span> {form.getValues('firstName')}
          </li>
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20  font-semibold">Last name:</span> {form.getValues('lastName')}
          </li>
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20  font-semibold">Email:</span> {form.getValues('email')}
          </li>
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20  font-semibold">Contact No.:</span> {form.getValues('contactNumber')}
          </li>
          {/* <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20 shrink-0 font-semibold">Address:</span> {form.getValues('address')}
          </li> */}
        </ul>
      </div>
      <div className="w-full">
        <h3 className="mb-4 text-base font-semibold capitalize">Role & Access</h3>
        <ul className="w-full space-y-2">
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20 shrink-0 font-semibold">Username:</span> {form.getValues('username')}
          </li>
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20 shrink-0 font-semibold">Password:</span> {form.getValues('password')}
          </li>
          <li className="flex items-center gap-2 break-words py-1">
            <span className="w-20 shrink-0 font-semibold">Role:</span> {role?.name}
          </li>
        </ul>
      </div>
    </section>
  );
}
