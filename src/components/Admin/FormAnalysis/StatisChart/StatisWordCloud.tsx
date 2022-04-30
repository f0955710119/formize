import { FC } from "react";
import WordCloud from "react-d3-cloud";
import { NonTextCount } from "../../../../types/statis";

const COLORS = [
  "#7e8480",
  "#a2a9a5",
  "#b4bcb7",
  "#c3c9c5",
  "#d2d7d4",
  "#e1e4e2",
];

interface StatisWordCloudProps {
  count: NonTextCount[];
}

const StatisWordCloud: FC<StatisWordCloudProps> = ({ count }) => {
  const sum = count.reduce((acc, cur) => (acc += +cur.value), 0);
  const data = count.map((c) => {
    return {
      text: c.rowTitle,
      value: +c.value,
    };
  });

  const fontSize = (word: { text: string; value: number }) =>
    12 * (1 + word.value / sum);
  const rotate = () => Math.abs(Math.random() * 180 - 45);

  return (
    <WordCloud
      font="jfOpenhuninn"
      width={400}
      height={300}
      data={data}
      fontSize={fontSize}
      rotate={rotate}
      padding={2}
      fill={COLORS[Math.round(Math.random() * 5)]}
    />
  );
};

export default StatisWordCloud;
