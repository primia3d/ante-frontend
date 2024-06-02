import { ProjectsTable } from './ProjectsTable';

import { TProjects } from '@/types/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

type ListViewProps = {
  data: TProjects[];
};

export function ListView({ data }: ListViewProps) {
  return (
    <Tabs defaultValue="all" className="flex h-full flex-col gap-10 xl:flex-row">
      <TabsList className="flex h-min w-full items-start justify-start gap-2 overflow-x-auto bg-white px-3 py-3 shadow xl:max-w-72 xl:flex-col xl:py-8">
        <TabsTrigger
          value="all"
          className="w-full p-4 text-custom-300 ring-0 hover:bg-custom-100 data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:hover:bg-custom-100 xl:justify-start xl:px-10"
        >
          <span className="sr-only">All</span>All Projects
        </TabsTrigger>
        <TabsTrigger
          value="recent"
          className="w-full p-4 text-custom-300 ring-0 hover:bg-custom-100 data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:hover:bg-custom-100 xl:justify-start xl:px-10"
        >
          <span className="sr-only">Recently Added</span>
          Recently Added
        </TabsTrigger>
        <TabsTrigger
          value="complete"
          className="w-full p-4 text-custom-300 ring-0 hover:bg-custom-100 data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:hover:bg-custom-100 xl:justify-start xl:px-10"
        >
          <span className="sr-only">Marked as Done</span>
          Marked as Done
        </TabsTrigger>
        <TabsTrigger
          value="archive"
          className="w-full p-4 text-custom-300 ring-0 hover:bg-custom-100 data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:hover:bg-custom-100 xl:justify-start xl:px-10"
        >
          <span className="sr-only">Archived</span>
          Archived
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 overflow-hidden">
        <TabsContent value="all" className="mt-0 h-full overflow-x-auto rounded-lg bg-white shadow">
          <h2 className="p-10 text-base font-bold capitalize">All Projects</h2>
          <ProjectsTable data={data} />
        </TabsContent>
        <TabsContent value="recent" className="mt-0 h-full overflow-x-auto rounded-lg bg-white shadow">
          <h2 className="p-10 text-base font-bold capitalize">Recent Projects</h2>
          <ProjectsTable data={data} />
        </TabsContent>
        {/* <TabsContent value="complete" className="mt-0 h-full overflow-x-auto rounded-lg bg-white shadow">
          <h2 className="p-10 text-base font-bold capitalize">Completed Projects</h2>
          <ProjectsTable data={data.filter(({ isComplete }) => isComplete)} />
        </TabsContent> */}
        {/* <TabsContent value="archive" className="mt-0 h-full overflow-x-auto rounded-lg bg-white shadow">
          <h2 className="p-10 text-base font-bold capitalize">Archived Projects</h2>
          <ProjectsTable data={data.filter(({ isArchived }) => isArchived)} />
        </TabsContent> */}
      </div>
    </Tabs>
  );
}
