import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { NonTextCount } from "../../../../types/statis";

interface StatisBarProps {
  count?: NonTextCount[];
}

const StatisBar: FC<StatisBarProps> = ({ count }) => {
  return (
    <BarChart width={460} height={320} data={count}>
      <XAxis dataKey="rowTitle" />
      <YAxis yAxisId="left" orientation="left" stroke="#8e9aa2" />
      <Tooltip />
      <Bar yAxisId="left" dataKey="value" fill="#b4bcb7" barSize={50} />
    </BarChart>
  );
};

export default StatisBar;
