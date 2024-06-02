import { OverviewChart } from './OverviewChart';

import { CustomIcon } from '@/features/CustomIcon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';

export type TOverviewData = {
  name: string;
  total: number;
};

const data: TOverviewData[] = [
  {
    name: 'Project 1',
    total: Math.floor(Math.random() * 100),
  },
  {
    name: 'Project 2',
    total: Math.floor(Math.random() * 100),
  },
  {
    name: 'Project 3',
    total: Math.floor(Math.random() * 100),
  },
  {
    name: 'Project 4',
    total: Math.floor(Math.random() * 100),
  },
  {
    name: 'Project 5',
    total: Math.floor(Math.random() * 100),
  },
  {
    name: 'Project 6',
    total: Math.floor(Math.random() * 100),
  },
];

export function ProgressOverviewWidget() {
  const totalCompleted = (data.reduce((sum, project) => sum + project.total, 0) / data.length).toFixed(2);

  return (
    <Card className="appear bg-white">
      <CardHeader className="px-6 py-8">
        <CardTitle className="text-xl font-bold">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[28rem] p-0 sm:p-6">
        <OverviewChart data={data} />
      </CardContent>
      <CardFooter className="gap-5 pt-6 sm:pt-0">
        <div className="flex w-full items-center justify-between rounded-lg border p-8 text-lg">
          <div className="flex items-center gap-3">
            <CustomIcon variant="star" className="text-custom-400" />
            <p className="font-semibold capitalize text-custom-300">Completed</p>
          </div>
          <div className="font-bold">{totalCompleted}%</div>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg border p-8 text-lg">
          <div className="flex items-center gap-3">
            <CustomIcon variant="calendar" className="text-custom-400" />
            <p className="font-semibold capitalize text-custom-300">In Progress</p>
          </div>
          <div className="font-bold">{(100 - parseFloat(totalCompleted)).toFixed(2)}%</div>
        </div>
      </CardFooter>
    </Card>
  );
}
