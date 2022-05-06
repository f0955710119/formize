import { FC } from "react";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import QuestionIcon from "../QuestionIcon";

const QuestionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem 0.7rem 1rem 1rem;
  width: 81%;
  border: 1px solid #c8c8c8;

  @media ${breakpointConfig.laptopM} {
    min-height: 6rem;
    min-width: 35rem;
    margin-right: 1.5rem;
  }

  @media ${breakpointConfig.tablet} {
    min-width: 30rem;
  }

  @media ${breakpointConfig.mobileL} {
    min-width: 20rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.3px;
`;

const TitleIndex = styled.span`
  font-size: 1.5rem;
  margin-right: 0.3rem;
  transform: translateY(-3.5px);
`;

const Note = styled.div`
  width: 100%;
  font-size: 1.4rem;
  color: #aaa;
`;

interface CreatedQuestionProps {
  title: string;
  note: string;
  questionType: string;
  index: string;
}

const CreatedQuestion: FC<CreatedQuestionProps> = ({
  title,
  note,
  questionType,
  index,
}: CreatedQuestionProps) => {
  const noteText = questionType === "2" ? "引言沒有註解" : note;
  return (
    <QuestionWrapper>
      <QuestionIcon
        questionType={questionType}
        style=" transform: translateY(-2.5px); width:1.6rem; height:1.6rem; margin-right:0.8rem;"
      />
      <TitleIndex>{index}</TitleIndex>
      <Title>{title.length > 12 ? `${title.slice(0, 13)}...` : title}</Title>
      <Note>
        {noteText.length > 14 ? `${noteText.slice(0, 15)}...` : noteText}
      </Note>
    </QuestionWrapper>
  );
};

export default CreatedQuestion;
