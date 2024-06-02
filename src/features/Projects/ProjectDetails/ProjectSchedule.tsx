import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Separator } from '@/components/Separator';
import { SCurveChart } from '@/features/Charts';
import { cn } from '@/utils/cn';

type ProjectScheduleProps = {
  className?: string;
};

export function ProjectSchedule({ className }: ProjectScheduleProps) {
  return (
    <Card className={cn('appear', className)}>
      <CardHeader className="h-20 flex-row justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Project Schedule</CardTitle>
        <div>
          <Select defaultValue="S-CURVE">
            <SelectTrigger className="w-auto gap-2 rounded-full border-none bg-custom-100 px-4 font-bold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="S-CURVE">S-Curve</SelectItem>
              <SelectItem value="GANTT-CHART">Gantt Chart</SelectItem>
              <SelectItem value="MILESTONES">Milestones</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="relative py-10">
        <SCurveChart />
        <div className="absolute left-6 top-3">
          <h3 className="text-2xl font-bold text-success-300">+1.20%</h3>
          <p className="font-semibold text-custom-300">Productivity</p>
        </div>
      </CardContent>
    </Card>
  );
}
