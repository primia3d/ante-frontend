import { useMutation, useQuery } from '@tanstack/react-query';
import { format, formatDistanceStrict, formatDistanceToNowStrict } from 'date-fns';
import { useAtom } from 'jotai';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CustomIcon } from '../CustomIcon';

import { ProjectForm, ProjectFormProps } from './ProjectForm';
import { projectCurrentPageAtom, projectPageSizeAtom } from './projectAtom';

import { deleteProject, getProjectList, updateProject } from '@/api/projects';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Label } from '@/components/Label';
import { Progress } from '@/components/Progress';
import { useToast } from '@/components/Toaster';
import { TProjects } from '@/types/projects';

// type ProjectCardProps = {
//   contractPrice: number;
//   projectTitle: string;
//   endDate: string;
//   startDate: string;
//   status: string;
//   projectID: number;
// };

export function ProjectCard({ id, budget, client, description, endDate, name, startDate, status }: TProjects) {
  const { toast } = useToast();
  const [currentPage] = useAtom(projectCurrentPageAtom);
  const [pageSize] = useAtom(projectPageSizeAtom);
  const contractLength = formatDistanceStrict(new Date(startDate.raw), new Date(endDate.raw));
  const remainingLength = formatDistanceToNowStrict(new Date(endDate.raw));

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
  });
  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
  });
  const { refetch } = useQuery({
    queryKey: ['currentUser'],
    enabled: false,
    queryFn: () => getProjectList({ page: currentPage, perPage: pageSize }),
  });

  const handleUpdateSubmit: ProjectFormProps['onSubmit'] = async (values) => {
    try {
      await updateProjectMutation.mutateAsync({
        ...values,
        id: id as number,
        startDate: format(values.startDate, 'yyyy-MM-dd'),
        endDate: format(values.endDate, 'yyyy-MM-dd'),
      });

      // await refetch();

      toast({
        description: 'Project has successfully edited!',
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

  const handleDelete = async () => {
    try {
      await deleteProjectMutation.mutateAsync({
        id: id as number,
        password: '123456',
      });

      await refetch();

      toast({
        description: 'Project has successfully deleted!',
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

  return (
    <li className="projectCard hover:-translate-y-[10px] hover:cursor-pointer">
      <Card>
        <CardHeader className="space-y-3 pb-3">
          <CardTitle className="flex justify-between">
            <span>{name}</span>
            <span className="flex gap-2">
              <ProjectForm
                variant="edit"
                values={{
                  id,
                  budget: budget.raw,
                  endDate: new Date(endDate.raw),
                  startDate: new Date(startDate.raw),
                  description,
                  name,
                  clientInformation: client,
                  status,
                }}
                button={
                  <Button>
                    <Edit className="h-4 w-4" />
                  </Button>
                }
                onSubmit={handleUpdateSubmit}
              />
              <ConfirmDialog
                message="Are you sure you want to delete this project?"
                title="Delete"
                className="h-auto bg-transparent p-0 text-black hover:bg-none"
                icon={<Trash2 className="h-4 w-4" />}
                handleSubmit={handleDelete}
              />
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="capitalize">
              {status}
            </Badge>
          </div>
        </CardHeader>
        <Link to={`/projects/${id}`}>
          <CardContent>
            <ul className="flex w-full flex-col gap-3">
              <li className="flex items-center gap-3 ">
                <CustomIcon variant="star" className="fill-custom-200 text-custom-200" />
                <span className="font-semibold text-custom-300">PHP {budget.raw}</span>
              </li>
              <li className="flex items-center gap-3 text-custom-300">
                <CustomIcon variant="clock" className="fill-custom-200 text-custom-200" />
                <div>
                  {contractLength}
                  <span className="ml-2 text-custom-200">({remainingLength} remaining)</span>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-start gap-3">
            <Label className="text-xs font-normal uppercase text-custom-300">Progress:</Label>
            <Progress value={33} className="h-3 bg-custom-100" />
          </CardFooter>
        </Link>
      </Card>
    </li>
  );
}
