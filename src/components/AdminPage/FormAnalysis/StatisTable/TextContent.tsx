import { FC } from "react";

import styled from "styled-components";

import { ContentWrapper } from "./style";

interface RowProps {
  isOdd: boolean;
}

const Row = styled.div<RowProps>`
  padding: 1rem 1rem;
  font-size: 1.6rem;
  background-color: ${(props: RowProps) =>
    props.isOdd ? "#f8f8f8" : "transparent"};
`;

const Times = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

interface TextContentProps {
  count: { [key: string]: number | string };
  isCountRepeat: boolean;
}

const TextContent: FC<TextContentProps> = ({ count, isCountRepeat }) => {
  const oneLineTextContent = Object.keys(count);
  const multipleTextContent = Object.values(count);
  const oneLineTextResponsedCount = Object.values(count);
  const multipleTextResponsedCount = Object.keys(count);

  const inputContentArr = isCountRepeat
    ? oneLineTextContent
    : multipleTextContent;
  const sameContentTimesArr = isCountRepeat
    ? oneLineTextResponsedCount
    : multipleTextResponsedCount;

  return (
    <ContentWrapper>
      {inputContentArr.map((content, i) => {
        const times = sameContentTimesArr[i];
        const timesRenderText = isCountRepeat ? `(${times})` : `${times}.`;
        return (
          <Row key={i} isOdd={Number.isInteger((i + 1) / 2)}>
            <Times>{timesRenderText}</Times>
            {content}
          </Row>
        );
      })}
    </ContentWrapper>
  );
};
export default TextContent;
