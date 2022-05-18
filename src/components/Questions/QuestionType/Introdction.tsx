import { FC } from "react";
import styled from "styled-components";

const IntroductionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4rem;
  border-radius: 3px;
  border: 3px solid ${(props) => props.theme.note};
  transition: border 0.3s;
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const TextContent = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.theme.title};
`;

interface IntroductionProps {
  textContent: string;
}

const Introduction: FC<IntroductionProps> = ({ textContent }) => {
  return (
    <IntroductionWrapper>
      <TextContent>{textContent}</TextContent>
    </IntroductionWrapper>
  );
};

export default Introduction;
