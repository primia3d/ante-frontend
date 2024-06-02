import { useState } from 'react';

import { Input } from '@/components/Input';
import { CustomIcon } from '@/features/CustomIcon';
import { WidgetLibrary } from '@/features/Dashboard';
import { ProgressOverviewWidget, TaskWidget, UpdatesWidget } from '@/features/Dashboard/Widgets';
import { useBoolean } from '@/hooks/useBoolean';
import { CreateTask } from '@/features/Dashboard/Tasks/CreateTask';
import { TLayout } from '@/types/dashboard';
import { cn } from '@/utils/cn';
import { QuestBoard } from '@/features/Dashboard/Widgets/QuestBoard';
import { ProjectSchedule } from '@/features/Projects';
// import { trpc } from '@/libs/trpc/react';

export default function DashboardPage() {
  const { value: isWidgetMenuOpen, set: setIsWidgetMenuOpen } = useBoolean(false);
  const { value: isCreateTaskOpen, set: setIsCreateTaskOpen } = useBoolean(false);
  const [layout, setLayout] = useState<TLayout>('display-a');
  // const { data: backOfficeUser } = trpc.user.user.getCurrentUser.useQuery();

  return (
    <div className="flex h-full flex-col space-y-5 sm:space-y-10">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center whitespace-nowrap text-xl font-semibold">
            <CustomIcon variant="sun" className="mr-2 h-6 w-6" />
            Good Morning,&nbsp;
            {/* <span className="text-custom-300">{backOfficeUser?.userName}!</span> */}
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search..."
              className="h-9 rounded border bg-white placeholder:font-semibold placeholder:text-custom-200 sm:min-w-72"
            />
            <CustomIcon variant="search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-custom-200" />
          </div>
          <WidgetLibrary
            isOpen={isWidgetMenuOpen}
            setIsOpen={setIsWidgetMenuOpen}
            layout={layout}
            setLayout={setLayout}
          />
        </div>
      </section>
      <section
        className={cn(
          'grid auto-rows-min gap-10',
          layout === 'display-a' && 'sm:grid-cols-2 sm:[&>*:last-child]:col-span-2',
          layout === 'display-b' && '!flex h-full items-center overflow-x-auto',
          layout === 'display-c' && 'grid sm:grid-cols-2',
          layout === 'display-d' && 'grid-cols-1',
        )}
      >
        <TaskWidget />
        <UpdatesWidget />
        <ProgressOverviewWidget />
        <QuestBoard />
        <ProjectSchedule />
      </section>

      <CreateTask isOpen={isCreateTaskOpen} setIsOpen={setIsCreateTaskOpen} />
    </div>
  );
}
