import { FC } from "react";
import styled from "styled-components";
import type { NonTextCount } from "../../../../types/statis";

const NonTextContentWrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  color: #777;
  border-bottom: 1px solid #c8c8c8;
  padding: 0.5rem 0;
`;
const Data = styled.div`
  display: inline-block;
  height: 4rem;
  padding: 0.5rem 1rem;
  width: 50%;
`;

interface NonTextContentProps {
  count: NonTextCount[];
  headerNames: string[];
}

const NonTextContent: FC<NonTextContentProps> = ({ count, headerNames }) => {
  return (
    <NonTextContentWrapper>
      <Row>
        <Header>{headerNames[0]}</Header>
        <Header>{headerNames[1]}</Header>
      </Row>
      {count.map((content, i) => {
        return (
          <Row key={i}>
            <Data>{content.rowTitle}</Data>
            <Data style={{ textAlign: "center" }}>{content.value}</Data>
          </Row>
        );
      })}
    </NonTextContentWrapper>
  );
};

export default NonTextContent;
