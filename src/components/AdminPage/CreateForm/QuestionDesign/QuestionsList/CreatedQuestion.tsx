import { FC } from "react";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import questionConfig from "../../../../../configs/questionConfig";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import QuestionIcon from "../QuestionIcon";

interface QuestionWrapperProps {
  isActive: boolean;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem 0.7rem 1rem 1rem;
  width: 81%;
  border: 2px solid
    ${(props) => (props.isActive ? props.theme.note : "#c8c8c8")};
  border-radius: 3px;

  transition: border 0.3s;

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
    width: 100%;
    margin-right: 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: default;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.7px;
`;

const TitleIndex = styled.span`
  font-size: 1.4rem;
  margin-right: 0.3rem;
  transform: translateY(-2px);
`;

const Note = styled.div`
  width: 100%;
  font-size: 1.4rem;
  color: #aaa;
  letter-spacing: 0.5px;
  cursor: default;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0rem 0.8rem;
  background-color: #aaa;
  border-radius: 30px;
  cursor: default;
`;

const customIconStyleString = `
  transform: translateY(0);
  width:1.4rem;
  height:1.4rem;
  margin-right:0.6rem;
  fill: #fff;
`;

const QuestionTypeName = styled.span`
  font-size: 1.3rem;
  color: #fff;
`;

interface CreatedQuestionProps {
  id: string;
  title: string;
  note: string;
  questionType: string;
  index: string;
}

const CreatedQuestion: FC<CreatedQuestionProps> = ({
  id,
  title,
  note,
  questionType,
  index,
}: CreatedQuestionProps) => {
  const { editingQuestion } = useAppSelector((state) => state.question);
  const noteTextRaw = questionType === "2" ? "引言沒有註解" : note;
  const noteText = noteTextRaw.trim().length === 0 ? "暫無註解" : noteTextRaw;
  const hasEditingQuestion = editingQuestion !== null ? editingQuestion.id : "";
  return (
    <QuestionWrapper isActive={hasEditingQuestion === id}>
      <IconWrapper>
        <QuestionIcon type={questionType} style={customIconStyleString} />
        <QuestionTypeName>{questionConfig[questionType]}</QuestionTypeName>
      </IconWrapper>
      <TitleWrapper>
        {questionType !== "2" && <TitleIndex>{index}.</TitleIndex>}
        <Title>{title.length > 10 ? `${title.slice(0, 11)}...` : title}</Title>
      </TitleWrapper>
      <Note>
        {noteText.length > 12 ? `${noteText.slice(0, 13)}...` : noteText}
      </Note>
    </QuestionWrapper>
  );
};

export default CreatedQuestion;
