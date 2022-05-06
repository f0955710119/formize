import { FC } from "react";
import WordCloud from "react-d3-cloud";
import useWindow from "../../../../hooks/useWindow";
import { NonTextCount } from "../../../../types/statis";

const COLORS = ["#555", "#666", "#7e8480", "#a2a9a5", "#b4bcb7"];

interface StatisWordCloudProps {
  count: NonTextCount[];
}

const StatisWordCloud: FC<StatisWordCloudProps> = ({ count }) => {
  const windowObj = useWindow();
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
      width={
        windowObj === undefined || windowObj === null
          ? 400
          : windowObj.innerWidth > 425
          ? 400
          : 350
      }
      height={300}
      data={data}
      fontSize={fontSize}
      rotate={rotate}
      padding={2}
      // fill={COLORS[Math.round(Math.random() * 5)]}
    />
  );
};

export default StatisWordCloud;
