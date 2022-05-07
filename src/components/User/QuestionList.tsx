import { FC, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";

import OneLineText from "./Questions/OneLineText";
import MultipleLineText from "./Questions/MultipleLineText";
import Introduction from "./Questions/Introdction";
import OneChoice from "./Questions/OneChoice";
import MultiChoice from "./Questions/MultipleChoice";
import Matrix from "./Questions/Matrix";
import Slider from "./Questions/Slider";
import Sort from "./Questions/Sort";
import Date from "./Questions/Date";

import helper from "../../utils/helper";

const QuestionWrapper = styled.div`
  position: relative;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => {
    return props.theme.title;
  }};

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const NoteText = styled.div`
  width: 100%;
  color: #aaa;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.note}; ;
`;

const LimitationQuestionTag = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: 5rem;
  height: 2.4rem;
  font-size: 1.4rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 2.4rem;
  color: ${(props) => props.theme.optionText};
`;

const ErrorReminder = styled.p`
  margin: 2rem 0;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  animation: moveInTop 0.3s ease-in-out 0.3s;

  @keyframes moveInTop {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0rem);
    }
  }
`;

const ResetAnswerButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  width: 10rem;
  height: 2.4rem;
  font-size: 1.4rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.title};
  color: #fff;
  cursor: pointer;
`;

interface QuestionListProps {
  titleIndex: string;
  question: Question;
}

const QuestionList: FC<QuestionListProps> = ({ titleIndex, question }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <>
      <QuestionWrapper>
        {question.type !== "2" && (
          <>
            <Heading>
              {helper.generateUserFormQuestionTitle(titleIndex, question.title)}
            </Heading>
            {question.validations.required && (
              <LimitationQuestionTag>必填</LimitationQuestionTag>
            )}
            {question.note && <NoteText>{question.note}</NoteText>}
          </>
        )}
        {question.type === "0" && (
          <OneLineText
            textType="text"
            length={question.validations.length}
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type === "1" && (
          <MultipleLineText
            maxLength={question.validations.length}
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type === "2" && <Introduction textContent={question.title} />}
        {question.type === "3" && (
          <OneChoice
            options={question.options ? question.options : []}
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}
        {question.type === "4" && (
          <MultiChoice
            options={question.options ? question.options : []}
            maxSelected={
              question.validations.maxSelected
                ? question.validations.maxSelected
                : 1
            }
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}
        {question.type === "5" && (
          <Matrix
            options={question.options ? question.options : []}
            matrixs={question.matrixs ? question.matrixs : []}
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}
        {question.type === "6" && (
          <OneLineText
            textType="number"
            questionId={question.id}
            max={question.validations.max}
            min={question.validations.min}
            decimal={question.validations.decimal}
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type === "7" && (
          <Slider
            questionId={question.id}
            max={question.validations.max && question.validations.max}
            min={question.validations.min && question.validations.min}
            unit={question.validations.unit && question.validations.unit}
            interval={
              question.validations.interval && question.validations.interval
            }
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type === "8" && (
          <Sort
            options={question.options ? question.options : []}
            maxSelected={
              question.validations.maxSelected
                ? question.validations.maxSelected
                : 1
            }
            questionId={question.id}
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type === "9" && (
          <Date
            questionId={question.id}
            isMultipleDate={question.validations.multipleDate}
            hasRange={question.validations.hasRange}
            startDate={question.validations.startDate}
            endDate={question.validations.endDate}
            maxSelectedDateQuantity={
              question.validations.maxSelectedDateQuantity
            }
            setErrorMessage={setErrorMessage}
          />
        )}

        {question.type !== "2" && <ErrorReminder>{errorMessage}</ErrorReminder>}
      </QuestionWrapper>
    </>
  );
};

export default QuestionList;
