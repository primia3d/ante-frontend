import { MenuIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { NotificationsMenu } from './Notifications';

import { Button } from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { useBoolean } from '@/hooks/useBoolean';
// import { trpc } from '@/libs/trpc/react';

type HeaderProps = {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
};

export default function Header({ setIsHidden }: HeaderProps) {
  const { value: isNotificationsMenuOpen, set: setIsNotificationsMenuOpen } = useBoolean(false);
  // const { data: backOfficeUser } = trpc.user.user.getCurrentUser.useQuery();
  // const doLogoutMutation = trpc.user.user.doLogout.useMutation();

  const handleLogout = async () => {
    localStorage.removeItem('token');

    window.location.href = '/';
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-30 flex h-14 bg-white">
      <div className="flex w-full items-center justify-between px-5 py-3  lg:px-6 lg:py-4">
        <div className="flex items-center gap-3 lg:gap-8 ">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-slate-700/80 hover:text-white focus-visible:bg-transparent focus-visible:text-white lg:hidden"
            onClick={() => setIsHidden(false)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-10">
          <NotificationsMenu isOpen={isNotificationsMenuOpen} setIsOpen={setIsNotificationsMenuOpen} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full p-0 hover:bg-gray-200"
              >
                <img src="/images/person01.webp" alt="" className="h-full w-full object-cover" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  {/* <p className="text-sm font-medium leading-none">{backOfficeUser?.userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{backOfficeUser?.email}</p> */}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
