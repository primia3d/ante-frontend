import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Separator } from '@/components/Separator';
import { CustomIcon } from '@/features/CustomIcon';
import { cn } from '@/utils/cn';

const financialData = [
  { name: 'Collection', value: 555000 },
  { name: 'Expenses', value: 126000 },
];

const COLORS = ['#2A41CC', '#5F71D9'];

type FinancialStandingProps = {
  className?: string;
};

export function FinancialStanding({ className }: FinancialStandingProps) {
  const projectBalance = financialData[0].value - financialData[1].value;
  const totalCollection = financialData[0].value;
  const totalExpenses = financialData[1].value;

  return (
    <Card className={cn('appear flex flex-col', className)}>
      <CardHeader className="h-20 flex-row justify-between">
        <CardTitle className="text-xl font-bold">Financial Standing</CardTitle>
        <Link to="/treasury">
          <CustomIcon variant="externalLink" className="text-custom-200" />
        </Link>
      </CardHeader>
      <Separator />

      <CardContent className="place-items-content grid flex-1 py-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
          <div className="flex-1 shrink-0">
            <ResponsiveContainer height={200}>
              <PieChart>
                <Pie dataKey="value" data={financialData} innerRadius={60} outerRadius={95}>
                  {financialData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h2 className="whitespace-nowrap text-xl font-semibold">
                PHP {projectBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <p className="text-custom-300">Project Balance</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-4 w-4 rounded bg-primary-100" />
                <div className="space-y-1">
                  <h4 className="whitespace-nowrap text-base font-semibold leading-none">
                    PHP{' '}
                    {totalCollection.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h4>
                  <p className="text-custom-300">Collection</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-4 w-4 rounded bg-[#5F71D9]" />
                <div className="space-y-1">
                  <h4 className="whitespace-nowrap text-base font-semibold leading-none">
                    PHP {totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h4>
                  <p className="text-custom-300">Expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
