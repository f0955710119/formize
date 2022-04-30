import { FC } from "react";
import styled from "styled-components";
import helper from "../../../utils/helper";
import Table from "./StatisTable/Table";
import NonTextContent from "./StatisTable/NonTextContent";
import TextContent from "./StatisTable/TextContent";

import type {
  StringKeyObject,
  Count,
  NonTextCount,
} from "../../../types/statis";
import StatisPie from "./StatisChart/StatisPie";
import StatisBar from "./StatisChart/StatisBar";
import StatisWordCloud from "./StatisChart/StatisWordCloud";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  border-radius: 3px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(180, 188, 183, 0.298);
  }
`;

const ChartWrapper = styled.div`
  display: inline-block;
  width: 46rem;
  height: 36rem;
`;

const PieWrapper = styled(ChartWrapper)``;

const BarWrapper = styled(ChartWrapper)`
  /* transform: translateY(2.5rem); */
  height: 36rem;
`;

const WordCloudWrapper = styled(ChartWrapper)`
  height: 32.2rem;
  border: 3px solid rgba(180, 188, 183, 0.298);
  border-radius: 7px;
`;

const MultipleTextReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 64rem);
  height: 100%;
`;

const MultipleTextReminderText = styled.span`
  font-size: 2rem;
  color: #c3c9c5;
`;

interface StatisResponseItemProps {
  type: string;
  id: string;
  title: string;
  count: Count;
  numericData?: StringKeyObject;
}

const renderResponseItemContent = (
  type: string,
  title: string,
  count: Count,
  numericData?: StringKeyObject
) => {
  switch (type) {
    case "0":
    case "1":
    case "9": {
      const countForText = count as StringKeyObject;
      const countForChart = Object.keys(count)
        .map((key, i) => {
          return {
            rowTitle: key,
            value: Object.values(count)[i],
          };
        })
        .sort((a, b) => {
          if (a.value > b.value) return -1;
          return 1;
        })
        .slice(0, 5);
      return (
        <>
          <Table title={title} isTextContent>
            <TextContent count={countForText} isCountRepeat={type !== "1"} />
          </Table>
          {type !== "1" ? (
            <>
              <WordCloudWrapper>
                <StatisWordCloud count={countForChart} />
              </WordCloudWrapper>
              <BarWrapper>
                <StatisBar count={countForChart} />
              </BarWrapper>
            </>
          ) : (
            <MultipleTextReminder>
              <MultipleTextReminderText>
                此題型不提供文字統計
              </MultipleTextReminderText>
            </MultipleTextReminder>
          )}
        </>
      );
    }

    case "6":
    case "7": {
      if (!numericData) return <></>;
      const countForOptionType = count as NonTextCount[];
      const countForChart = Object.keys(numericData)
        .map((key, i) => {
          return {
            rowTitle: key,
            value: Object.values(numericData)[i],
          };
        })
        .sort((a, b) => {
          if (+a.rowTitle > +b.rowTitle) return -1;
          return 1;
        });

      return (
        <>
          <Table title={title} isTextContent={false}>
            <NonTextContent
              count={countForOptionType}
              headerNames={helper.generateheaderName(type)}
            />
          </Table>
          <WordCloudWrapper>
            <StatisWordCloud count={countForChart} />
          </WordCloudWrapper>
          <BarWrapper>
            <StatisBar count={countForChart} />
          </BarWrapper>
        </>
      );
    }
    case "3":
    case "4":
    case "5":
    case "8": {
      const countForOptionType = count as NonTextCount[];
      return (
        <>
          <Table title={title} isTextContent={false}>
            <NonTextContent
              count={countForOptionType}
              headerNames={helper.generateheaderName(type)}
            />
          </Table>
          <PieWrapper>
            <StatisPie count={countForOptionType} />
          </PieWrapper>
          <BarWrapper>
            <StatisBar count={countForOptionType} />
          </BarWrapper>
        </>
      );
    }
    default:
      return <></>;
  }
};

const StatisResponseItem: FC<StatisResponseItemProps> = ({
  type,
  title,
  count,
  numericData,
}) => {
  return (
    <ItemContainer>
      {renderResponseItemContent(type, title, count, numericData)}
    </ItemContainer>
  );
};

export default StatisResponseItem;
