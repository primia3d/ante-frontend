import { useLocation } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan 2023',
    uv: 20,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb 2023',
    uv: 18,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar 2023',
    uv: 17,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr 2023',
    uv: 17,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May 2023',
    uv: 19,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun 2023',
    uv: 25,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul 2023',
    uv: 40,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug 2023',
    uv: 60,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep 2023',
    uv: 72,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct 2023',
    uv: 75,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov 2023',
    uv: 72,
    pv: 3800,
    amt: 2100,
  },
  {
    name: 'Dec 2023',
    uv: 65,
    pv: 4300,
    amt: 2100,
  },
];

export function SCurveChart() {
  const { pathname } = useLocation();

  return (
    <ResponsiveContainer width="100%" height={pathname.includes('dashboard') ? 500 : 280}>
      <AreaChart
        height={400}
        data={data}
        margin={{
          top: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#10B981"
          strokeWidth={4}
          fill="#ECFDF5"
          dot={{
            strokeWidth: 2,
            stroke: 'black',
            fill: 'black',
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
