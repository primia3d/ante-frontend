import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../features/Header/Header';
import { Sidebar } from '../features/Sidebar/Sidebar';

import { TaskShortcut } from '@/features/TaskShortcut';
import { useSocketStore } from '@/lib/socketStore';

export function RootLayout() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const { pathname } = useLocation();

  const { connect, disconnect, onEvent } = useSocketStore();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect, onEvent]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Sidebar isHidden={isSidebarHidden} setIsHidden={setIsSidebarHidden} />

      <div className="z-10 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header setIsHidden={setIsSidebarHidden} />
        <main className="w-full flex-1 bg-custom-50 p-5 lg:p-16">
          <Outlet />

          {!pathname.includes('/dashboard') && <TaskShortcut />}
        </main>
      </div>
    </div>
  );
}
