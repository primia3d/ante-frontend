import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/utils/cn';

type NavItemProps = {
  name: string;
  path: string;
  icon: ReactNode;
  isExpanded: boolean;
};

export function NavItem({ name, path, icon, isExpanded }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  return (
    <li className="rounded-md">
      <Link
        to={path}
        className={cn(
          'relative flex items-center rounded-md p-4 text-white/70 hover:text-white',
          isActive && 'text-white',
          isExpanded ? 'w-full' : '',
        )}
      >
        {isActive && <div className="absolute -left-1 h-14 w-1 bg-secondary-100" />}
        {icon}
        <div
          className={cn(
            'whitespace-nowrap capitalize',
            isExpanded ? 'visible ml-6 opacity-100' : 'invisible opacity-0',
          )}
        >
          {name}
        </div>
      </Link>
    </li>
  );
}
