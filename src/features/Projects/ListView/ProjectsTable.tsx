import { Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent, MouseEvent } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { TProjects } from '@/types/projects';

type ProjectsTableProps = {
  data: TProjects[];
};

export function ProjectsTable({ data }: ProjectsTableProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="h-20">
          <TableHead className="pl-10 font-bold text-custom-300">Project Title</TableHead>
          <TableHead className="pl-10 font-bold text-custom-300">Status</TableHead>
          <TableHead className="pl-10 font-bold text-custom-300">Time & Date Created</TableHead>
          <TableHead className="pl-10 font-bold text-custom-300">Project Amount</TableHead>
          <TableHead className="pl-10 font-bold text-custom-300" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((project) => (
          <TableRow
            key={project.id}
            className="h-20 cursor-pointer hover:bg-custom-100"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <TableCell className="min-w-[20rem] pl-10 font-semibold text-custom-400">{project.name}</TableCell>
            <TableCell className="min-w-[12rem] pl-10 text-custom-300">{project.startDate.dateTime}</TableCell>
            <TableCell className="min-w-[12rem] pl-10 text-custom-300">{project.endDate.dateTime}</TableCell>
            <TableCell className="min-w-[12rem] pl-10 text-custom-300">{project.budget.raw}</TableCell>
            <TableCell className="min-w-[6rem] max-w-[6rem] text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="inline-flex h-9 w-9 cursor-pointer items-center justify-center text-custom-300 hover:text-custom-400">
                    <Ellipsis />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleClick}>Mark as done</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleClick}>Archive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-error-300 focus:text-error-300" onClick={handleClick}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
