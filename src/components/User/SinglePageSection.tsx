import { FC, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";

import QuestionList from "./QuestionList";
import PageCTAButton from "./PageCTAButton";

import helper from "../../utils/helper";
import scrollBar from "../UI/scrollBar";
import { useAppSelector } from "../../hooks/useAppSelector";

const SinglePageContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  width: 100%;
  /* height: 100%; */

  overflow-y: scroll;
  ${scrollBar}

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface SinglePageFormContainerProps {
  isHigherThan800: boolean;
}

const SinglePageFormContainer = styled.div<SinglePageFormContainerProps>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isHigherThan800 ? "" : "justify-content:center;align-items:center;"}
  max-width: 90rem;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* height: 100vh; */
`;

const SinglePageSubmitButton = styled(PageCTAButton)`
  background-color: ${(props) => props.theme.title};
  width: 18rem;

  bottom: 2rem;
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
  const singlePageFormContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (!singlePageFormContainerRef.current) return;
    setContainerHeight(singlePageFormContainerRef.current?.clientHeight);
  }, []);

  return (
    <SinglePageContainer>
      <SinglePageFormContainer
        isHigherThan800={containerHeight > 800}
        ref={singlePageFormContainerRef}
      >
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
