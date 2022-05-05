import { FC } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";

import QuestionList from "./QuestionList";

import helper from "../../utils/helper";

const SinglePageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SinglePageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  width: 100%;
  /* height: 100vh; */
`;

interface SinglePageSectionProps {
  questions: Question[];
}

const SinglePageSection: FC<SinglePageSectionProps> = ({ questions }) => {
  const indexArr = helper.generateQuestionIndexArr(questions);
  return (
    <SinglePageFormSection>
      <SinglePageFormContainer>
        {questions.map((question, i) => {
          return <QuestionList titleIndex={indexArr[i]} question={question} />;
        })}
      </SinglePageFormContainer>
    </SinglePageFormSection>
  );
};

export default SinglePageSection;
