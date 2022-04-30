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
  count: { [key: string]: number | string };
  isCountRepeat: boolean;
}

const TextTableContent: FC<TextTableContentProps> = ({
  count,
  isCountRepeat,
}) => {
  const inputContentArr = isCountRepeat
    ? Object.keys(count)
    : Object.values(count);
  const sameContentTimesArr = isCountRepeat
    ? Object.values(count)
    : Object.keys(count);

  return (
    <TableContentWrapper>
      {inputContentArr.map((content, i) => (
        <Row key={i} isOdd={Number.isInteger((i + 1) / 2)}>
          {isCountRepeat ? (
            <Times>{`(${sameContentTimesArr[i]})`}</Times>
          ) : (
            <Times>{`${sameContentTimesArr[i]}.`}</Times>
          )}
          {content}
        </Row>
      ))}
    </TableContentWrapper>
  );
};
export default TextTableContent;
