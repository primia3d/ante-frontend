import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { LayoutDashboardIcon, SquareKanbanIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { getProjectByID } from '@/api/projects';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { CustomIcon } from '@/features/CustomIcon';
import { TaskWidget, UpdatesWidget } from '@/features/Dashboard/Widgets';
import { DocumentControl, FinancialStanding, isKanbanMode, KanbanBoard, ProjectSchedule } from '@/features/Projects';

export default function ProjectDetails() {
  const { id } = useParams();

  const [isKanban, setIsKanban] = useAtom(isKanbanMode);

  const { data } = useQuery({
    queryKey: ['getProjectByID', id],
    queryFn: () => getProjectByID({ id: id || '' }),
  });

  const handleKanbanMode = () => {
    setIsKanban((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-col gap-10">
      <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{data?.name}</h2>
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink pathName="/projects">Project Select</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{isKanban ? 'Project Kanban' : 'Project Dashboard'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="primary" className="text-base font-semibold" onClick={handleKanbanMode}>
            {isKanban ? <LayoutDashboardIcon className="h-5 w-5" /> : <SquareKanbanIcon className="h-5 w-5" />}

            <span className="">{isKanban ? 'Dashboard' : 'Kanban'}</span>
          </Button>
          {!isKanban && (
            <Button type="button" variant="primary" className="divide-x p-0 text-base font-semibold">
              <span className="px-4 py-3">Bill of Quantity</span>
              <span className="px-4 py-3">
                <CustomIcon variant="file-download" />
              </span>
            </Button>
          )}
        </div>
      </section>
      {!isKanban && (
        <section className="space-y-5">
          <div className="grid auto-rows-min grid-cols-[repeat(auto-fit,minmax(100%,1fr))] gap-5 sm:grid-cols-[repeat(auto-fit,minmax(600px,1fr))]">
            <FinancialStanding />
            <ProjectSchedule />
            <DocumentControl />
          </div>
          <div className="grid auto-rows-min grid-cols-[repeat(auto-fit,minmax(100%,1fr))] gap-5 sm:grid-cols-[repeat(auto-fit,minmax(600px,1fr))]">
            <TaskWidget />
            <UpdatesWidget />
          </div>
        </section>
      )}
      {isKanban && <KanbanBoard projectId={Number(id)} />}
    </div>
  );
}
