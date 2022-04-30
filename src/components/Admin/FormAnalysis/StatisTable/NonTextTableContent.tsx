import { FC } from "react";
import styled from "styled-components";

import { TableContentWrapper } from "./style";

const ChoiceTableContentTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableHeader = styled.th`
  width: 50%;
  border-bottom: 1px solid #c8c8c8;
  padding: 0.5rem 0;
`;
const TableData = styled.td`
  height: 4rem;
  padding: 0.5rem 1rem;
  width: 50%;
`;

interface ChoiceTableContentProps {
  count: { option: string; times: number }[];
  headerNames: string[];
}

const ChoiceTableContent: FC<ChoiceTableContentProps> = ({
  count,
  headerNames,
}) => {
  return (
    <TableContentWrapper>
      <ChoiceTableContentTable>
        <TableRow>
          <TableHeader>{headerNames[0]}</TableHeader>
          <TableHeader>{headerNames[1]}</TableHeader>
        </TableRow>
        {count.map((content, i) => (
          <TableRow key={i}>
            <TableData>{content.option}</TableData>
            <TableData style={{ textAlign: "center" }}>
              {content.times}
            </TableData>
          </TableRow>
        ))}
      </ChoiceTableContentTable>
    </TableContentWrapper>
  );
};

export default ChoiceTableContent;
