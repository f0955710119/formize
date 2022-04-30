import { FC } from "react";
import styled from "styled-components";
import { TableContentWrapper } from "./style";

interface RowProps {
  isOdd: boolean;
}

const Row = styled.div<RowProps>`
  padding: 1rem 1rem;
  font-size: 1.4rem;
  background-color: ${(props: RowProps) =>
    props.isOdd ? "#f8f8f8" : "transparent"};
`;

const Times = styled.span`
  font-size: 1.3rem;
  margin-right: 0.5rem;
`;

interface TextTableContentProps {
  count: { [key: string]: number };
}

const TextTableContent: FC<TextTableContentProps> = ({ count }) => {
  const inputContentArr = Object.keys(count);
  const sameContentTimesArr = Object.values(count);

  return (
    <TableContentWrapper>
      {inputContentArr.map((content, i) => (
        <Row key={i} isOdd={Number.isInteger((i + 1) / 2)}>
          <Times>{`(${sameContentTimesArr[i]})`}</Times>
          {content}
        </Row>
      ))}
    </TableContentWrapper>
  );
};
export default TextTableContent;
