import { useQuery } from '@tanstack/react-query';
import { DialogTitle } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/Dialog';
import { Input } from '@/components/Input';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { TCollaborators } from '@/types/task';
import { cn } from '@/utils/cn';
import { getCollaborators } from '@/api/task';

interface User {
  id: string;
  fullName: string;
  roleName: string;
}

type CollaboratorsProps = {
  // value?: TTaskFormSchema['collaborators'];
  sendDataToParent: (data: User[]) => void;
};

export const Collaborators = forwardRef<unknown, CollaboratorsProps>(function Collaborators(props, ref) {
  const { sendDataToParent } = props;
  const { value: isOpen, set: setIsOpen } = useBoolean(false);
  const [selectedUsers, setSelectedUsers] = useState<TCollaborators[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultImage =
    'https://www.shutterstock.com/image-illustration/frankenstein-halloween-illustration-square-260nw-497657392.jpg';

  const { data } = useQuery({
    queryKey: ['getCollaborators'],
    queryFn: () => getCollaborators(),
  });

  const collaboratorsList = data || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSelectedUsers = (users: TCollaborators[]) => {
    setSelectedUsers(users);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedUserIds((prevSelectedUserIds) =>
      prevSelectedUserIds.includes(id)
        ? prevSelectedUserIds.filter((userId) => userId !== id)
        : [...prevSelectedUserIds, id],
    );
  };

  const handleSubmit = () => {
    const updatedSelectedUsers = collaboratorsList.filter((user) => selectedUserIds.includes(user.id));
    handleSelectedUsers(updatedSelectedUsers);
    sendDataToParent(updatedSelectedUsers);
    setIsOpen(false);
  };

  const filteredUsers = collaboratorsList.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.roleName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemoveUser = (id: string) => {
    setSelectedUserIds((prev) => prev.filter((item) => item !== id));
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((user) => user.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex w-full select-none items-center justify-start rounded-lg border-2 border-custom-100 bg-custom-50 p-3 text-custom-200">
        {!selectedUsers.length && 'Add from your team...'}
        {!!selectedUsers.length && (
          <ul className="flex flex-wrap items-start justify-start gap-1">
            {selectedUsers.map(({ fullName, id }) => (
              <li
                key={id}
                className="flex items-center gap-3 truncate rounded-lg bg-custom-200 px-2.5 py-1.5 text-custom-400"
              >
                {fullName}
                <Button type="button" onClick={() => handleRemoveUser(id)}>
                  <CustomIcon variant="square-minus" className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <DialogTrigger asChild>
          <Button type="button">
            <CustomIcon
              variant="square-plus"
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
            />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent variant="top" className="p-8">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-lg font-bold">Add Collaborators</DialogTitle>
          <div className="relative">
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={handleSearch}
              className={cn(
                'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 pl-10 placeholder:text-custom-200',
              )}
            />
            <CustomIcon variant="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-200" />
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="absolute right-4 top-0 h-6 w-6 -translate-y-0.5 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="my-5">
          <h4 className="font-bold text-custom-300">Members</h4>
          <ul className="flex max-h-96 flex-col gap-8 overflow-y-auto py-6 pr-4">
            {filteredUsers.map(({ id, fullName, roleName }) => (
              <li key={id} className="flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <img src={defaultImage} alt={fullName} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-semibold text-custom-400">{fullName}</p>
                  <p className="text-[11px] text-custom-300">{roleName}</p>
                </div>
                <Checkbox
                  className="h-5 w-5 border-gray-500"
                  checked={selectedUserIds.includes(id)}
                  onCheckedChange={() => handleCheckboxChange(id)}
                />
              </li>
            ))}
            {!filteredUsers.length && <p className="text-center">No users found.</p>}
          </ul>
        </div>

        <DialogFooter className="mt-5 sm:space-x-5">
          <Button type="button" variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" className="w-full" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
