import { FC } from "react";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import QuestionIcon from "../QuestionIcon";

const QuestionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 80%;
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
  font-size: 1.6rem;
  width: 90%;
  margin-bottom: 0.5rem;
`;

const Note = styled.div`
  width: 100%;
  font-size: 1.4rem;
  color: #aaa;
`;

const iconStyle = {
  width: "1.8rem",
  height: "1.8rem",
  fill: "#aaa",
  transform: "translateY(-0.2rem)",
  marginRight: "0.3rem",
};

interface CreatedQuestionProps {
  title: string;
  note: string;
  questionType: string;
}

const CreatedQuestion: FC<CreatedQuestionProps> = ({
  title,
  note,
  questionType,
}: CreatedQuestionProps) => {
  const noteText = questionType === "2" ? "引言沒有註解" : note;
  return (
    <QuestionWrapper>
      <Title>
        <QuestionIcon questionType={questionType} />
        {title}
      </Title>
      <Note>{noteText}</Note>
    </QuestionWrapper>
  );
};

export default CreatedQuestion;
