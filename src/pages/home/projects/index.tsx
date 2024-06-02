import { TabsContent } from '@radix-ui/react-tabs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { createProject, getProjectList } from '@/api/projects';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { useToast } from '@/components/Toaster';
import { CustomIcon } from '@/features/CustomIcon';
import {
  ProjectCard,
  ProjectForm,
  ProjectFormProps,
  isKanbanMode,
  projectCurrentPageAtom,
  projectPageSizeAtom,
} from '@/features/Projects';
import { KanbanView } from '@/features/Projects/KanbanView';
import { ListView } from '@/features/Projects/ListView';

export default function ProjectsPage() {
  const { toast } = useToast();
  const { pathname } = useLocation();

  const [currentPage] = useAtom(projectCurrentPageAtom);
  const [pageSize] = useAtom(projectPageSizeAtom);
  const [, setIsKanban] = useAtom(isKanbanMode);
  // const [sort, setSort] = useAtom(projectSortAtom);
  // const [search] = useAtom(projectSearchAtom);
  // const [queryEnabled, setQueryEnabled] = useState(true);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
  });
  const { data: { list: projectList = [] } = {}, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getProjectList({ page: currentPage, perPage: pageSize }),
  });

  const handleSubmit: ProjectFormProps['onSubmit'] = async (values) => {
    try {
      await createProjectMutation.mutateAsync({
        ...values,
        startDate: format(values.startDate, 'yyyy-MM-dd'),
        endDate: format(values.endDate, 'yyyy-MM-dd'),
      });

      await refetch();

      toast({
        description: 'New Project has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'Oops! something went wrong',
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    setIsKanban(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs defaultValue="card" className="flex h-full flex-col gap-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded border bg-white placeholder:font-semibold placeholder:text-custom-200 sm:min-w-72"
            />
            <CustomIcon variant="search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-custom-200" />
          </div>
          <TabsList className="grid w-full grid-cols-3 divide-x overflow-hidden rounded-lg border p-0">
            <TabsTrigger
              value="card"
              className="h-full shrink-0 rounded-none data-[state=active]:bg-custom-200 data-[state=inactive]:bg-white data-[state=inactive]:text-custom-200"
            >
              <span className="sr-only">Card</span>
              <CustomIcon variant="card" />
            </TabsTrigger>
            <TabsTrigger
              value="kanban"
              className="h-full shrink-0 rounded-none data-[state=active]:bg-custom-200 data-[state=inactive]:bg-white data-[state=inactive]:text-custom-200"
            >
              <span className="sr-only">Kanban</span>
              <CustomIcon variant="kanban" />
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="h-full shrink-0 rounded-none data-[state=active]:bg-custom-200 data-[state=inactive]:bg-white data-[state=inactive]:text-custom-200"
            >
              <span className="sr-only">List</span>
              <CustomIcon variant="list" />
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="flex-1">
        <TabsContent value="card" className="h-full focus-visible:outline-none">
          <ul className="grid h-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(100%,1fr))] gap-5 xs:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
            {projectList.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="kanban" className="h-full focus-visible:outline-none">
          <div className="h-full overflow-x-auto overflow-y-hidden rounded-2xl bg-white p-5">
            <KanbanView />
          </div>
        </TabsContent>
        <TabsContent value="list" className="h-full focus-visible:outline-none">
          <ListView data={projectList} />
        </TabsContent>
      </div>

      <ProjectForm
        variant="create"
        button={
          <Button
            className="fixed bottom-28 right-8 h-14 w-14 rounded-full bg-primary-100 text-white shadow hover:bg-primary-100/90 sm:bottom-32 sm:right-14"
            title="Create/Assign Task"
          >
            <Plus />
          </Button>
        }
        onSubmit={handleSubmit}
      />
    </Tabs>
  );
}
