import { FC, useState, useCallback, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend,
} from "recharts";
import type { NonTextCount } from "../../../../types/statis";

const COLORS = [
  "#7e8480",
  "#a2a9a5",
  "#b4bcb7",
  "#c3c9c5",
  "#d2d7d4",
  "#e1e4e2",
];

const generateLabelPoisitionValue = (setting: { [key: string]: number }) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, midAngle, percentage } = setting;
  const radiusLotText = innerRadius + (outerRadius - innerRadius) * percentage;
  const x = cx + radiusLotText * Math.cos(-midAngle * RADIAN);
  const y = cy + radiusLotText * Math.sin(-midAngle * RADIAN);
  return [x, y];
};

const renderCustomizedLabel = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    payload,
  } = props;

  const settings = {
    cx,
    cy,
    innerRadius,
    outerRadius,
    midAngle,
  };

  // prettier-ignore
  const [xLotText, yLotText] = generateLabelPoisitionValue({ ...settings, percentage: 0.4 });
  const [x, y] = generateLabelPoisitionValue({ ...settings, percentage: 0.1 });

  const title = payload.payload.rowTitle;
  const textColor = index < 2 ? "#fff" : "#555";
  return title.length > 4 ? (
    <>
      <text
        fill={textColor}
        x={xLotText}
        y={yLotText - 10}
        textAnchor={xLotText > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${payload.payload.rowTitle}`}
      </text>
      <text
        fill={textColor}
        x={xLotText}
        y={yLotText + 15}
        textAnchor={xLotText > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  ) : (
    <text
      fill={textColor}
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${payload.payload.rowTitle} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`次數 ${value}`}</text>
    </g>
  );
};

interface StatisPieProps {
  count: NonTextCount[];
}

const StatisPie: FC<StatisPieProps> = ({ count }) => {
  const [activePieIndex, setActivePieIndex] = useState<number>(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActivePieIndex(index);
    },
    [setActivePieIndex]
  );

  const handledCount = useMemo(
    () =>
      [...count]
        .sort((a, b) => {
          if (a.value > b.value) return -1;
          else return 1;
        })
        .filter((c) => c.value !== 0),
    [count]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={460} height={300}>
        <Pie
          data={handledCount}
          cx="50%"
          cy="50%"
          labelLine={false}
          activeIndex={activePieIndex}
          activeShape={renderActiveShape}
          label={renderCustomizedLabel}
          outerRadius={120}
          dataKey="value"
          nameKey="rowTitle"
          fill="#7e8480"
          onMouseEnter={onPieEnter}
        >
          {handledCount.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={0} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatisPie;
