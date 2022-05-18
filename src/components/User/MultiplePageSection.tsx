import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";

import helper from "../../utils/helper";
import { Settings } from "../../types/form";
import { Question } from "../../types/question";
import QuestionList from "./QuestionList";
import { useAppSelector } from "../../hooks/useAppSelector";
import useWholePageAnswersValidCheck from "../../hooks/useWholePageAnswersValidCheck";
import scrollBar from "../UI/scrollBar";

const moveInRightAnimation = `
  animation: moveInRight 0.3s ease-in-out;

  @keyframes moveInRight {
    0% {
      opacity: 0.3;
      transform: translate(6rem,-6.5rem);
    }
    100% {
      opacity: 1;
      transform: translate(0,-6.5rem);
    }
  }
`;

const moveInLeftAnimation = `
  animation: moveInLeft 0.3s ease-in-out;

  @keyframes moveInLeft {
    0% {
      opacity: 0.3;
      transform: translate(-6rem,-6.5rem);
    }
    100% {
      opacity: 1;
      transform: translate(0,-6.5rem);
    }
  }
`;

const MultiPageFormContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90rem;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
`;

interface QuestionContainerProps {
  moveInAnimation: string;
}

const QuestionContainer = styled.div<QuestionContainerProps>`
  padding: 0 2rem;
  width: 100%;
  height: 87%;
  overflow: scroll;
  transform: translate(0, -6.5rem);
  ${(props) => props.moveInAnimation}

  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBar}

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.8rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.title};
  }
`;

interface MultiPageFormQuestionButtonProps {
  isLastPage: boolean;
}

const MultiPageFormQuestionButton = styled.button<MultiPageFormQuestionButtonProps>`
  position: absolute;
  ${(props) => (props.isLastPage ? "right: 22rem" : "right: 4rem")};
  bottom: 7rem;
  text-align: center;
  line-height: 3.4rem;

  width: 16rem;
  height: 3.4rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #333;
    background-color: ${(props) => props.theme.note};
  }
`;

interface MultiplePageSectionProps {
  setNavigatePage: Dispatch<SetStateAction<number>>;
  settings: Settings;
  questions: Question[];
  sendResponses: () => Promise<void>;
}

const MultiplePageSection: FC<MultiplePageSectionProps> = ({
  setNavigatePage,
  settings,
  questions,
  sendResponses,
}) => {
  const { answers } = useAppSelector((state) => state.user);
  const [questionPage, setQuestionPage] = useState<number>(0);
  const [moveInAnimation, setMoveInAnimation] =
    useState<string>(moveInRightAnimation);
  const isUpdateMoveAnimation = useRef<boolean>(false);
  const animationTimer = useRef<any>();
  const questionContainerRef = useRef<HTMLDivElement | null>(null);
  const wholePageValidHandler = useWholePageAnswersValidCheck();

  const responsedPageQuestionsList = questions.filter(
    (question) => question.page === questionPage + 1
  );

  useEffect(() => {
    setTimeout(() => {
      isUpdateMoveAnimation.current = false;
      setMoveInAnimation("");
    }, 300);
  }, []);

  useEffect(() => {
    if (!isUpdateMoveAnimation.current) return;

    animationTimer.current = setTimeout(() => {
      isUpdateMoveAnimation.current = false;
      setMoveInAnimation("");
    }, 300);
  }, [moveInAnimation]);

  useEffect(() => {
    if (questionContainerRef.current === null) return;
    questionContainerRef.current.scrollTop = 0;
  }, [questionPage]);

  const indexInDifferentPageArr = helper.generateQuestionMultiPageIndexArr(
    settings.pageQuantity,
    questions
  );
  const questionsInDiffernetPageArr = helper.generateDifferentPageQuestionsArr(
    settings.pageQuantity,
    questions
  );

  return (
    <MultiPageFormContainer>
      <MultiPageFormQuestionButton
        isLastPage
        onClick={() => {
          if (questionPage === 0) {
            setNavigatePage(0);
            return;
          }
          setQuestionPage((prevState) => prevState - 1);
          clearTimeout(animationTimer.current);
          isUpdateMoveAnimation.current = true;
          setMoveInAnimation(moveInLeftAnimation);
        }}
      >
        {questionPage === 0 ? "回到歡迎頁" : "上一頁"}
      </MultiPageFormQuestionButton>
      <MultiPageFormQuestionButton
        isLastPage={false}
        onClick={() => {
          const hasInvalidInput = wholePageValidHandler(
            responsedPageQuestionsList,
            answers
          );
          if (hasInvalidInput) return;
          if (questionPage === questionsInDiffernetPageArr.length - 1) {
            sendResponses();
            return;
          }

          setQuestionPage((prevState) => prevState + 1);
          clearTimeout(animationTimer.current);
          isUpdateMoveAnimation.current = true;
          setMoveInAnimation(moveInRightAnimation);
        }}
      >
        {questionPage === questionsInDiffernetPageArr.length - 1
          ? "送出問卷回覆"
          : "下一頁"}
      </MultiPageFormQuestionButton>
      <QuestionContainer
        moveInAnimation={moveInAnimation}
        ref={questionContainerRef}
      >
        {responsedPageQuestionsList.map((question, i) => {
          return (
            <QuestionList
              key={question.id}
              titleIndex={indexInDifferentPageArr[questionPage][i]}
              question={question}
              isCreatingProcess={false}
            />
          );
        })}
      </QuestionContainer>
    </MultiPageFormContainer>
  );
};

export default MultiplePageSection;
