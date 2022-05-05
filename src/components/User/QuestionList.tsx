import { FC } from "react";
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
import questionConfig from "../../configs/questionConfig";

const QuestionContainer = styled.div`
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

const RequireQuestionTag = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: 5rem;
  height: 2.4rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 24px;
  color: ${(props) => props.theme.optionText};
`;

const generateResponsedUserFormQuestion = (
  questionType: string,
  question: Question
) => {
  switch (questionType) {
    case questionConfig.ONE_LINE_TEXT: {
      if (!question.validations.length) return;
      return (
        <OneLineText
          textType="text"
          length={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.MULTIPLE_LINE_TEXT: {
      return (
        <MultipleLineText
          maxLength={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.INTRODUCTION: {
      return <Introduction textContent={question.title} />;
    }

    case questionConfig.ONE_CHOICE: {
      if (question.options) {
        return (
          <OneChoice options={question.options} questionId={question.id} />
        );
      }
    }

    case questionConfig.MULTIPLE_CHOICE: {
      if (question.options && question.validations.maxSelected) {
        return (
          <MultiChoice
            options={question.options}
            maxSelected={question.validations.maxSelected}
            questionId={question.id}
          />
        );
      }
    }

    case questionConfig.MATRIX: {
      if (question.options && question.matrixs) {
        return (
          <Matrix
            options={question.options}
            matrixs={question.matrixs}
            questionId={question.id}
          />
        );
      }
    }

    case questionConfig.NUMBER: {
      return (
        <OneLineText
          textType="number"
          questionId={question.id}
          max={question.validations.max}
          min={question.validations.min}
          decimal={question.validations.decimal}
        />
      );
    }

    case questionConfig.SLIDER: {
      return (
        <Slider
          questionId={question.id}
          max={question.validations.max && question.validations.max}
          min={question.validations.min && question.validations.min}
          unit={question.validations.unit && question.validations.unit}
          interval={
            question.validations.interval && question.validations.interval
          }
        />
      );
    }

    case questionConfig.SORT: {
      if (question.options && question.validations.maxSelected) {
        return (
          <Sort
            options={question.options}
            maxSelected={question.validations.maxSelected}
            questionId={question.id}
          />
        );
      }
      return;
    }
    case questionConfig.DATE: {
      if (!question.validations.startDate || !question.validations.endDate) {
        return (
          <Date
            questionId={question.id}
            isMultipleDate={question.validations.multipleDate}
            hasRange={question.validations.hasRange}
          />
        );
      }
      return (
        <Date
          questionId={question.id}
          isMultipleDate={question.validations.multipleDate}
          hasRange={question.validations.hasRange}
          startDate={question.validations.startDate}
          endDate={question.validations.endDate}
        />
      );
    }
  }
};

interface QuestionListProps {
  titleIndex: string;
  question: Question;
}

const QuestionList: FC<QuestionListProps> = ({ titleIndex, question }) => {
  return (
    <QuestionContainer>
      {question.type !== "2" && (
        <>
          <Heading>
            {helper.generateUserFormQuestionTitle(titleIndex, question.title)}
          </Heading>
          {question.validations.required && (
            <RequireQuestionTag>必填</RequireQuestionTag>
          )}
          {question.note && <NoteText>{question.note}</NoteText>}
        </>
      )}
      {generateResponsedUserFormQuestion(question.type, question)}
    </QuestionContainer>
  );
};

export default QuestionList;
