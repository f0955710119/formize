import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../configs/breakpointConfig";
import questionConfig from "../../configs/questionConfig";
import useAppSelector from "../../hooks/useAppSelector";
import { Question } from "../../types/question";
import { generateQuestionLimitationTagText } from "../../utils/questionListUtils";
import Date from "./QuestionType/Date";
import Introduction from "./QuestionType/Introdction";
import Matrix from "./QuestionType/Matrix";
import MultiChoice from "./QuestionType/MultipleChoice";
import MultipleLineText from "./QuestionType/MultipleLineText";
import OneChoice from "./QuestionType/OneChoice";
import OneLineText from "./QuestionType/OneLineText";
import Slider from "./QuestionType/Slider";
import Sort from "./QuestionType/Sort";

interface QuestionWrapperProps {
  hasErrorMessage: boolean;
  isCreatingProcess: boolean;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  padding: 2rem 2rem 0 2rem;
  position: relative;
  width: 100%;

  &:first-child {
    margin-top: 6rem;
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  border-radius: 7px;
  border: 3px solid transparent;
  transition: border 0.3s ease-in-out;

  ${(props) =>
    !props.hasErrorMessage ? "" : `border: 3px solid ${props.theme.titleContrast};`}
  ${(props) => (props.isCreatingProcess ? "border:none" : "")};

  & .MuiFormControl-root {
    margin-top: 2rem;
  }
`;

const Heading = styled.div`
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => props.theme.title};
`;

const NoteText = styled.div`
  margin: 2rem 0 2rem 0;
  width: 100%;
  color: #aaa;
  font-size: 1.6rem;
  color: ${(props) => props.theme.note}; ;
`;

const QuestionTypeTag = styled.div`
  display: inline-block;
  margin-top: 2rem;
  margin-right: 1rem;
  padding: 0 1.6rem;
  height: 2.4rem;
  font-size: 1.6rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 2.4rem;
  color: #fff;
  transform: translateY(-0.1rem);

  @media ${breakpointConfig.tablet} {
    font-size: 1.4rem;
  }
`;

const LimitationQuestionTag = styled(QuestionTypeTag)`
  background-color: ${(props) => props.theme.titleContrast};
`;

const ErrorReminder = styled.p`
  margin: 2rem 0;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.titleContrast};
  animation: moveInTop 0.3s ease-in-out;

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

const EmptyErrorMessage = styled.div`
  margin: 2rem 0;
  height: 2rem;
`;

interface QuestionListProps {
  titleIndex: string;
  question: Question;
  isCreatingProcess: boolean;
}

const QuestionList: FC<QuestionListProps> = ({
  titleIndex,
  question,
  isCreatingProcess = false,
}) => {
  const { errorMessages, errorMessagesIdKeys } = useAppSelector((state) => state.user);
  const errorMessage = errorMessages[errorMessagesIdKeys[question.id]];
  const hasErrorMessage = errorMessage !== "";
  const limitationTagText = generateQuestionLimitationTagText(question);

  const isNotIntroduction =
    errorMessage !== "" ? <ErrorReminder>{errorMessage}</ErrorReminder> : <EmptyErrorMessage />;

  const { id, title, type, note, options, matrixs, validations } = question;
  // prettier-ignore
  const { length, maxSelected, max, min, unit, interval, multipleDate, hasRange, startDate, endDate, maxSelectedDateQuantity} = validations;
  const questionTitle = titleIndex === "" ? title : `${titleIndex}. ${title}`;

  const limitationTags = limitationTagText.split("/");

  return (
    <>
      <QuestionWrapper
        hasErrorMessage={hasErrorMessage}
        style={{ marginBottom: type === "2" ? "4rem" : "2rem" }}
        isCreatingProcess={isCreatingProcess}
      >
        {type !== "2" && (
          <>
            <Heading>{questionTitle}</Heading>
            <QuestionTypeTag>{questionConfig[type] + "題"}</QuestionTypeTag>
            {limitationTagText !== "" &&
              limitationTags.map((tag) => (
                <LimitationQuestionTag key={tag}>{tag}</LimitationQuestionTag>
              ))}
            {note.trim().length !== 0 && <NoteText>{note}</NoteText>}
          </>
        )}
        {type === "0" && <OneLineText textType="text" length={length} questionId={id} />}
        {type === "1" && <MultipleLineText maxLength={length} questionId={id} />}
        {type === "2" && <Introduction textContent={title} />}
        {type === "3" && (
          <OneChoice
            options={options ? options : []}
            questionId={id}
            isCreatingProcess={isCreatingProcess}
          />
        )}
        {type === "4" && (
          <MultiChoice
            options={options ? options : []}
            maxSelected={maxSelected ? maxSelected : 1}
            questionId={id}
            isCreatingProcess={isCreatingProcess}
          />
        )}
        {type === "5" && (
          <Matrix
            options={options ? options : []}
            matrixs={matrixs ? matrixs : []}
            questionId={id}
          />
        )}
        {type === "6" && <OneLineText textType="number" questionId={id} max={max} min={min} />}
        {type === "7" && (
          <Slider
            questionId={id}
            max={max && max}
            min={min && min}
            unit={unit && unit}
            interval={interval && interval}
          />
        )}

        {type === "8" && (
          <Sort
            options={options ? options : []}
            maxSelected={maxSelected ? maxSelected : 1}
            questionId={id}
          />
        )}

        {type === "9" && (
          <Date
            questionId={id}
            isMultipleDate={multipleDate}
            hasRange={hasRange}
            startDate={startDate}
            endDate={endDate}
            maxSelectedDateQuantity={maxSelectedDateQuantity}
          />
        )}

        {type !== "2" ? isNotIntroduction : <></>}
      </QuestionWrapper>
    </>
  );
};

export default QuestionList;
