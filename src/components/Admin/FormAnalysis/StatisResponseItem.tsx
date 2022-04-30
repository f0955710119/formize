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

const ItemContainer = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  border-radius: 3px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(180, 188, 183, 0.298);
  }
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
      return (
        <Table title={title} isTextContent>
          <TextContent count={countForText} isCountRepeat={type !== "1"} />
        </Table>
      );
    }
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8": {
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
