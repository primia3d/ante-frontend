import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { TOverviewData } from './ProgressOverviewWidget';

type OverviewChartProps = {
  data: TOverviewData[];
};

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={15} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[8, 8, 8, 8]}
          className="fill-primary-100"
          background={{ fill: '#F6F8FB', radius: 8 }}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
