import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { NonTextCount } from "../../../../types/statis";

interface StatisBarProps {
  count?: NonTextCount[];
}

const StatisBar: FC<StatisBarProps> = ({ count }) => {
  return (
    <BarChart width={460} height={350} data={count}>
      <XAxis dataKey="rowTitle" />
      <YAxis yAxisId="left" orientation="left" stroke="#8e9aa2" />
      <Tooltip />
      <Legend verticalAlign="top" height={60} />
      <Bar yAxisId="left" dataKey="value" fill="#b4bcb7" barSize={50} />
    </BarChart>
  );
};

export default StatisBar;
