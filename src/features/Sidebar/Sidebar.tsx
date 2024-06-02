import { ChevronFirst, ChevronLast, X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import { NavItem } from './NavItem';
import { useSideBarData } from './useSideBarData';
import { sidebarAtom } from './sidebarAtom';

import { cn } from '@/utils/cn';
import { Button } from '@/components/Button';

type SidebarProps = {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
};

export function Sidebar({ isHidden, setIsHidden }: SidebarProps) {
  const sideBarData = useSideBarData();
  const [isExpanded, setIsExpanded] = useAtom(sidebarAtom);

  const sidebarRef = useRef<HTMLElement | null>(null);

  const handleLogout = async () => {
    localStorage.removeItem('token');

    window.location.href = '/';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsHidden(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsHidden(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsHidden]);

  return (
    <>
      <div
        className={cn(
          'absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300',
          !isHidden && 'z-40 opacity-100',
        )}
      />
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'absolute left-[270px] top-3 z-[51] hidden rounded-lg bg-secondary-200 p-1 text-white transition duration-150 ease-in-out hover:bg-secondary-200/90 lg:block',
          isExpanded ? 'translate-x-0' : '-translate-x-[218px]',
        )}
      >
        {isExpanded ? <ChevronFirst /> : <ChevronLast />}
      </button>

      <aside
        ref={sidebarRef}
        className={cn(
          'absolute left-0 top-0 z-50 flex h-[100dvh] flex-col overflow-hidden bg-primary-200 text-white shadow duration-150 ease-in-out lg:static lg:translate-x-0',
          isHidden ? '-translate-x-full' : 'translate-x-0',
          isExpanded ? 'w-72' : 'w-[70px]',
        )}
      >
        <div className="no-scrollbar flex h-full flex-col overflow-y-auto overflow-x-hidden duration-300 ease-linear">
          <div className="relative flex h-16 items-center gap-4 p-5">
            <button
              type="button"
              aria-label="button"
              className="flex h-8 w-8 items-center justify-center rounded bg-transparent text-white shadow-none hover:bg-transparent sm:hidden"
              onClick={() => setIsHidden(true)}
            >
              <X className="h-5 w-5" />
            </button>

            <Link to="/dashboard">
              {isExpanded ? (
                <img src="/images/ante-logo.svg" width={80} height={28} alt="logo" />
              ) : (
                <img src="/images/ante-logo-single.svg" width={26} height={40} alt="logo" />
              )}
            </Link>
          </div>
          <nav className="flex h-full flex-1 flex-col p-2">
            <div>
              <ul className="flex flex-col gap-2">
                {sideBarData.map(({ name, path, icon }) => (
                  <NavItem key={path} name={name} path={path} icon={icon} isExpanded={isExpanded} />
                ))}
              </ul>
            </div>
          </nav>
          <div className="px-2 py-5">
            <Button
              onClick={handleLogout}
              className={cn(
                'relative flex items-center justify-start rounded-md p-4 text-white/70 hover:text-white',
                isExpanded ? 'w-full' : 'w-12',
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M8 .889c0 .49-.398.889-.889.889H1.778v12.444H7.11a.889.889 0 1 1 0 1.778H1.778A1.778 1.778 0 0 1 0 14.222V1.778C0 .796.796 0 1.778 0H7.11C7.602 0 8 .398 8 .889Z"
                />
                <path
                  fill="currentColor"
                  d="m10.667 11.187 2.298-2.298H5.333a.889.889 0 1 1 0-1.778h7.632l-2.299-2.298a.889.889 0 0 1 1.258-1.257l3.816 3.816a.889.889 0 0 1 0 1.257l-3.816 3.816a.889.889 0 0 1-1.257-1.258Z"
                />
              </svg>
              <div
                className={cn(
                  'whitespace-nowrap capitalize',
                  isExpanded ? 'visible ml-6 opacity-100' : 'invisible opacity-0',
                )}
              >
                Log Out
              </div>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
