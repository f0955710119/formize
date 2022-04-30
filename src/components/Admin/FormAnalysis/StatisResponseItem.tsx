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
  transform: translateY(3.5rem);
`;

interface StatisResponseItemProps {
  type: string;
  id: string;
  title: string;
  count: Count;
}

const renderResponseItemContent = (
  type: string,
  title: string,
  count: Count
) => {
  switch (type) {
    case "0":
    case "1":
    case "9": {
      const countForText = count as StringKeyObject;
      const countForBar = Object.keys(count)
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
          <BarWrapper>
            <StatisBar count={countForBar} />
          </BarWrapper>
        </>
      );
    }

    case "6":
    case "7": {
      const countForOptionType = count as NonTextCount[];
      return (
        <Table title={title} isTextContent={false}>
          <NonTextContent
            count={countForOptionType}
            headerNames={helper.generateheaderName(type)}
          />
        </Table>
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
  }
};

const StatisResponseItem: FC<StatisResponseItemProps> = ({
  type,
  title,
  count,
}) => {
  return (
    <ItemContainer>
      {renderResponseItemContent(type, title, count)}
    </ItemContainer>
  );
};

export default StatisResponseItem;
