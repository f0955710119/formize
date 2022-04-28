import { FC } from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  padding-left: 3rem;
`;

const TitleText = styled.span`
  font-size: 1.6rem;
  color: #555;
`;

interface SurveyItemExpandTitleProps {
  text: string;
}

const SurveyItemExpandTitle: FC<SurveyItemExpandTitleProps> = ({
  text,
}: SurveyItemExpandTitleProps) => {
  return (
    <TitleWrapper>
      <TitleText>{text}</TitleText>
    </TitleWrapper>
  );
};

export default SurveyItemExpandTitle;
