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
import breakpointConfig from "../../../configs/breakpointConfig";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  height: 45rem;
  border-radius: 3px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(180, 188, 183, 0.298);
  }

  @media ${breakpointConfig.laptopL} {
    flex-direction: column;
    height: auto;
    padding-bottom: 8rem;
    padding-top: 3rem;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(180, 188, 183, 1);
    }
  }
`;

const ChartWrapper = styled.div`
  display: inline-block;
  width: 46rem;
  height: 36rem;

  @media ${breakpointConfig.tabletS} {
    width: 100%;
    max-width: 42rem;
    height: 38rem;
  }

  @media ${breakpointConfig.mobileL} {
    width: 36rem;
  }
`;

const PieWrapper = styled(ChartWrapper)``;

const BarWrapper = styled(ChartWrapper)`
  height: 36rem;
  @media ${breakpointConfig.laptopL} {
    height: 38rem;
    transform: translateX(-13px);
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

const MultipleTextReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 64rem);
  height: 100%;

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

interface StatisResponseItemProps {
  index: number;
  type: string;
  id: string;
  title: string;
  count: Count;
  numericData?: StringKeyObject;
}

const renderResponseItemContent = (
  index: number,
  type: string,
  title: string,
  count: Count,
  numericData?: StringKeyObject
) => {
  const chartTitleWithQuestionTitle = title.split("- ")[1].split(" ")[0];
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
                <ChartTitle style={{ marginTop: "0.3rem" }}>
                  圖{index + 1}-1、{chartTitleWithQuestionTitle}-文字雲統計
                </ChartTitle>
              </WordCloudWrapper>
              <BarWrapper>
                <StatisBar count={countForChart} />
                <ChartTitle style={{ transform: "translateX(2rem)" }}>
                  圖{index + 1}-2、{chartTitleWithQuestionTitle}-長條圖統計
                </ChartTitle>
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
            <ChartTitle style={{ marginTop: "0.3rem" }}>
              圖{index + 1}-1、{chartTitleWithQuestionTitle}-文字雲統計
            </ChartTitle>
          </WordCloudWrapper>
          <BarWrapper>
            <StatisBar count={countForChart} />
            <ChartTitle style={{ transform: "translateX(2rem)" }}>
              圖{index + 1}-2、{chartTitleWithQuestionTitle}-長條圖統計
            </ChartTitle>
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
            <ChartTitle>
              圖{index + 1}-1、{chartTitleWithQuestionTitle}-圓餅圖統計
            </ChartTitle>
          </PieWrapper>
          <BarWrapper>
            <StatisBar count={countForOptionType} />
            <ChartTitle style={{ transform: "translateX(2rem)" }}>
              圖{index + 1}-2、{chartTitleWithQuestionTitle}-長條圖統計
            </ChartTitle>
          </BarWrapper>
        </>
      );
    }
    default:
      return <></>;
  }
};

const StatisResponseItem: FC<StatisResponseItemProps> = ({
  index,
  type,
  title,
  count,
  numericData,
}) => {
  return (
    <ItemContainer>
      {renderResponseItemContent(index, type, title, count, numericData)}
    </ItemContainer>
  );
};

export default StatisResponseItem;
