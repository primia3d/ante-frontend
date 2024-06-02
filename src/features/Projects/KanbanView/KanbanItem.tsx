import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ellipsis, PenIcon, Trash2Icon } from 'lucide-react';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { Label } from '@/components/Label';
import { Progress } from '@/components/Progress';
import { CustomIcon } from '@/features/CustomIcon';
import { cn } from '@/utils/cn';

type KanbanItemProps = {
  id: UniqueIdentifier;
  title: string;
  budget: number;
  status: string;
};

export function KanbanItem({ id, title, budget, status }: KanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'item',
    },
  });

  // const contractLength = formatDistanceStrict(new Date(startDate), new Date(endDate));
  // const remainingLength = formatDistanceToNowStrict(new Date(endDate));

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        'group w-full cursor-pointer list-none rounded-xl border-2 border-transparent bg-custom-50 hover:border-primary-100',
        isDragging && 'opacity-50',
      )}
    >
      <div>
        <DropdownMenu>
          <div className="relative w-full break-words text-sm text-custom-400" {...listeners}>
            <Card className="border-none shadow-none">
              <CardHeader className="space-y-3 pb-3">
                <CardTitle className="flex justify-between text-[15px] font-bold">{title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="capitalize">
                    {status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="flex w-full flex-col gap-3">
                  <li className="flex items-center gap-3 ">
                    <CustomIcon variant="star" className="fill-custom-200 text-custom-200" />
                    <span className="font-semibold text-custom-300">PHP {budget.toLocaleString()}</span>
                  </li>
                  <li className="flex items-center gap-3 text-custom-300">
                    <CustomIcon variant="clock" className="fill-custom-200 text-custom-200" />
                    <div>
                      3 years
                      <span className="ml-2 text-custom-200">(2 years remaining)</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex-col items-start gap-3">
                <Label className="text-xs font-normal uppercase text-custom-300">Progress:</Label>
                <Progress value={33} className="h-3 bg-custom-100" />
              </CardFooter>

              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="absolute right-2 top-1  flex h-7 w-7 items-center justify-center rounded-full bg-background hover:bg-gray-100"
                >
                  <Ellipsis className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
            </Card>
          </div>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PenIcon className="h-4 w-4" />
              Edit Item
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error-300 focus:text-error-300">
              <Trash2Icon className="h-4 w-4" />
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
