import { FC } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { NonTextCount } from "../../../../types/statis";

interface StatisBarProps {
  count?: NonTextCount[];
}

const StatisBar: FC<StatisBarProps> = ({ count }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={460} height={350} data={count}>
        <XAxis dataKey="rowTitle" />
        <YAxis yAxisId="left" orientation="left" stroke="#8e9aa2" />
        <Tooltip />
        <Legend verticalAlign="top" height={60} />
        <Bar yAxisId="left" dataKey="value" fill="#ebc55f" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisBar;
