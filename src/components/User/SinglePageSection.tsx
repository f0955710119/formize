import { FC } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";

import QuestionList from "./QuestionList";
import PageCTAButton from "./PageCTAButton";

import helper from "../../utils/helper";

const SinglePageContainer = styled.section`
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

const SinglePageSubmitButton = styled(PageCTAButton)`
  background-color: ${(props) => props.theme.title};
  width: 18rem;
  bottom: 4rem;
  right: 50%;
  transform: translateX(50%);
`;

interface SinglePageSectionProps {
  questions: Question[];
  sendResponses: () => Promise<void>;
}

const SinglePageSection: FC<SinglePageSectionProps> = ({
  questions,
  sendResponses,
}) => {
  const indexArr = helper.generateQuestionIndexArr(questions);

  return (
    <SinglePageContainer>
      <SinglePageFormContainer>
        {questions.map((question, i) => {
          return (
            <QuestionList
              titleIndex={indexArr[i]}
              question={question}
              key={question.id}
            />
          );
        })}
        <SinglePageSubmitButton
          text="送出填答回覆"
          clickHandler={sendResponses}
        />
      </SinglePageFormContainer>
    </SinglePageContainer>
  );
};

export default SinglePageSection;
