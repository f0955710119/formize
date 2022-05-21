import { FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../configs/breakpointConfig";

import type { NonTextCount } from "../../../types/statis";
import StatisBar from "./StatisChart/StatisBar";
import StatisPie from "./StatisChart/StatisPie";
import StatisWordCloud from "./StatisChart/StatisWordCloud";

const ChartWrapper = styled.div`
  display: inline-block;
  width: 46rem;
  height: 36rem;

  @media ${breakpointConfig.desktopS} {
    margin-top: 4rem;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
    max-width: 42rem;
    height: 38rem;
  }

  @media ${breakpointConfig.mobileL} {
    width: 36rem;
  }
`;

const BarWrapper = styled(ChartWrapper)`
  height: 36rem;
  @media ${breakpointConfig.desktopS} {
    height: 38rem;
    transform: translateX(-13px);
    margin-top: 8rem;
  }
  @media ${breakpointConfig.mobileL} {
    transform: translateX(-2rem);
  }
`;

const WordCloudWrapper = styled(ChartWrapper)`
  height: 32.2rem;
  border: 3px solid rgba(180, 188, 183, 0.298);
  border-radius: 7px;

  @media ${breakpointConfig.mobileL} {
    max-width: 36rem;
    width: 100%;
  }
`;

const ChartTitle = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.8rem;
  text-align: center;

  @media ${breakpointConfig.tabletS} {
    font-size: 1.4rem;
  }
`;

const WordCloudChartTitle = styled(ChartTitle)`
  margin-top: 0.3rem;
`;

const BarChartTitle = styled(ChartTitle)`
  transform: translateX(2rem);
`;

interface Chart {
  index: number;
  title: string;
  count: NonTextCount[];
}

const WordCloudChart: FC<Chart> = ({ index, title, count }) => {
  return (
    <WordCloudWrapper>
      <StatisWordCloud count={count} />
      <WordCloudChartTitle>
        圖{index + 1}-1、{title}-文字雲統計
      </WordCloudChartTitle>
    </WordCloudWrapper>
  );
};

const BarChart: FC<Chart> = ({ index, title, count }) => {
  return (
    <BarWrapper>
      <StatisBar count={count} />
      <BarChartTitle>
        圖{index + 1}-2、{title}-長條圖統計
      </BarChartTitle>
    </BarWrapper>
  );
};

const PieChart: FC<Chart> = ({ index, title, count }) => {
  return (
    <ChartWrapper>
      <StatisPie count={count} />
      <ChartTitle>
        圖{index + 1}-1、{title}-圓餅圖統計
      </ChartTitle>
    </ChartWrapper>
  );
};

const chartConfig: { [key: string]: FC<Chart> } = {
  wordCloud: WordCloudChart,
  bar: BarChart,
  pie: PieChart,
};

interface StatisResponsedItemContentProps {
  type: string;
  index: number;
  title: string;
  count: NonTextCount[];
}

const StatisResponsedItemContent: FC<StatisResponsedItemContentProps> = (
  props
) => {
  const { type, index, title, count } = props;
  const itemProps = { index, title, count };
  const ResponsedItemContent = chartConfig[type];
  return <ResponsedItemContent {...itemProps} />;
};

export default StatisResponsedItemContent;
