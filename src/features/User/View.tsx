import { Eye, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { UserForm } from './UserForm';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Button } from '@/components/Button';
import { TUserFormSchema } from '@/types/user';
import { getRoleByID } from '@/api/role';
// import { trpc } from '@/libs/trpc/react';

type ViewUserProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  values: TUserFormSchema;
  onSubmit: (values: TUserFormSchema) => void | Promise<void>;
  isEditFormOpen: boolean;
  setIsEditFormOpen: (value: boolean) => void;
};

export default function ViewUser({
  isOpen,
  setIsOpen,
  values,
  isEditFormOpen,
  onSubmit,
  setIsEditFormOpen,
}: ViewUserProps) {
  const { data: role } = useQuery({
    queryKey: [''],
    queryFn: () => getRoleByID({ id: values.roleID }),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex h-8 items-center gap-2">
          <Eye className="h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-xl border-none bg-white text-[13px] sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
          <DialogTitle>TITLE</DialogTitle>
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
        <section className="flex flex-col items-start gap-5 p-5 sm:flex-row sm:p-8">
          <div className="w-full">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold capitalize">
              Basic Details
              <UserForm
                values={values}
                onSubmit={onSubmit}
                isOpen={isEditFormOpen}
                setIsOpen={setIsEditFormOpen}
                title="Edit User"
                variant="edit"
                label="Edit"
              />
            </h3>
            <ul className="w-full space-y-2">
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20  font-semibold">First name:</span> {values.firstName}
              </li>
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20  font-semibold">Last name:</span> {values.lastName}
              </li>
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20  font-semibold">Email:</span> {values.email}
              </li>
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20  font-semibold">Contact No.:</span> {values.contactNumber}
              </li>
              {/* <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20 shrink-0 font-semibold">Address:</span> {values.address}
              </li> */}
            </ul>
          </div>
          <div className="w-full">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold capitalize">
              Role & Access
              <UserForm
                values={values}
                onSubmit={onSubmit}
                isOpen={isEditFormOpen}
                setIsOpen={setIsEditFormOpen}
                title="Edit User"
                variant="edit"
                label="Edit"
              />
            </h3>
            <ul className="w-full space-y-2">
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20 shrink-0 font-semibold">Username:</span> {values.username}
              </li>
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20 shrink-0 font-semibold">Password:</span> {values.password}
              </li>
              <li className="flex items-center gap-2 break-words py-1">
                <span className="w-20 shrink-0 font-semibold">Role:</span> {role?.name}
              </li>
            </ul>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
