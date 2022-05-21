import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import type { Count, TextCount, NonTextCount } from "../../../types/statis";
import helper from "../../../utils/helper";
import NonTextContent from "./StatisTable/NonTextContent";
import Table from "./StatisTable/Table";
import TextContent from "./StatisTable/TextContent";

import StatisResponsedItemContent from "./StatisResponsedItemContent";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  height: 50rem;
  border-radius: 3px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(180, 188, 183, 0.298);
  }

  @media ${breakpointConfig.desktopS} {
    flex-direction: column;
    height: auto;
    padding-bottom: 8rem;
    padding-top: 3rem;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(180, 188, 183, 1);
    }
  }
`;

const MultipleTextReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 64rem);
  height: 100%;

  @media ${breakpointConfig.desktopS} {
    margin-top: 4rem;
  }

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    max-width: 46rem;
  }

  @media ${breakpointConfig.mobileL} {
    max-width: 36rem;
  }
`;

const MultipleTextReminderText = styled.span`
  font-size: 2rem;
  color: #c3c9c5;
`;
interface Chart {
  index: number;
  title: string;
  count: NonTextCount[];
}

const EmptyChart: FC = () => {
  return (
    <MultipleTextReminder>
      <MultipleTextReminderText>此題型不提供文字統計</MultipleTextReminderText>
    </MultipleTextReminder>
  );
};

const creatSortedCountForChart = (dataObj: TextCount | undefined) => {
  if (!dataObj) return [{ rowTitle: "", value: "" }];
  return Object.keys(dataObj)
    .map((key, i) => {
      return {
        rowTitle: key,
        value: Object.values(dataObj)[i],
      };
    })
    .sort((a, b) => {
      if (+a.value > +b.value) return -1;
      return 1;
    });
};

const renderResponseItemContent = (
  index: number,
  type: string,
  title: string,
  count: Count,
  numericData?: TextCount
) => {
  const countForNonTextTable = count as NonTextCount[];
  const countForTextTable = count as TextCount;

  const countForTextChart = creatSortedCountForChart(countForTextTable).slice(0, 5);
  const countForNumericChart = creatSortedCountForChart(numericData);

  const countForDifferentTypeConfig: { [key: string]: NonTextCount[] } = {
    "0": countForTextChart,
    "1": countForTextChart,
    "6": countForNumericChart,
    "7": countForNumericChart,
    "9": countForTextChart,
  };

  const countForRender = countForDifferentTypeConfig[type]
    ? countForDifferentTypeConfig[type]
    : countForNonTextTable;

  const chartProps = {
    index,
    title,
    count: countForRender,
  };

  const isTextType = type === "0" || type === "1" || type === "9";
  const chartType = isTextType ? "wordCloud" : "pie";

  return (
    <>
      {type !== "1" ? (
        <>
          <StatisResponsedItemContent type={chartType} {...chartProps} />
          <StatisResponsedItemContent type="bar" {...chartProps} />
        </>
      ) : (
        <EmptyChart />
      )}
    </>
  );
};

interface StatisResponsedItemProps {
  index: number;
  type: string;
  id: string;
  title: string;
  count: Count;
  numericData?: TextCount;
}

const StatisResponsedItem: FC<StatisResponsedItemProps> = (props) => {
  const { index, type, title, count, numericData } = props;
  const isTextContent = type === "0" || type === "1" || type === "9";
  const chartTitle = title.split("- ")[1].split(" ")[0];
  return (
    <ItemContainer>
      <Table title={title} isTextContent={isTextContent}>
        {isTextContent ? (
          <TextContent count={count as TextCount} isCountRepeat={type !== "1"} />
        ) : (
          <NonTextContent
            count={count as NonTextCount[]}
            headerNames={helper.generateColumnName(type)}
          />
        )}
      </Table>
      {renderResponseItemContent(index, type, chartTitle, count, numericData)}
    </ItemContainer>
  );
};

export default StatisResponsedItem;
