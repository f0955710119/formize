import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";
import Field from "./Fields/UI/Field";
import TitleIndex from "./Fields/UI/TitleIndex";
import EditableTitle from "./Fields/UI/EditableTitle";
import Note from "./Fields/UI/Note";
import type { Question } from "../../../../types/question";

import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import Choice from "./Fields/OneChoice";
import MultiChoice from "./Fields/MultiChoice";
import Martix from "./Fields/Martix";
import Slider from "./Fields/Slider";
import SequenceWeight from "./Fields/SequenceWeigth";
import Date from "./Fields/Date";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

interface QuestionFieldProps {
  question: Question;
}

const generateResponseQuestion = (type: string, question: Question) => {
  switch (type) {
    case "0":
      return <OneLineText />;
    case "1":
      return <MultiLineText />;
    case "2":
      return <Introduction id={question.id} title={question.title} />;
    case "3":
      if (question.options) {
        return <Choice id={question.id} options={question.options} />;
      }
    case "4":
      if (question.options) {
        return <Choice id={question.id} options={question.options} />;
      }
    case "5":
      if (question.options && question.martixs) {
        return (
          <Martix
            id={question.id}
            options={question.options}
            martixs={question.martixs}
          />
        );
      }
    case "6":
      return <OneLineText />;
    case "7":
      if (question.validations.min && question.validations.max) {
        return (
          <Slider
            id={question.id}
            min={question.validations.min}
            max={question.validations.max}
          />
        );
      }
    case "8":
      if (question.options) {
        return (
          <>
            <Choice id={question.id} options={question.options} />
          </>
        );
      }
    case "9":
      return <Date />;
  }
};

const QuestionField: FC<QuestionFieldProps> = ({
  question,
}: QuestionFieldProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestion } = useAppSelector((state) => state.question);
  const editingFieldHandler = (question: Question) => {
    const hasSwitched = editingQuestion && editingQuestion.id === question.id;
    if (hasSwitched) return;
    dispatch(questionActions.willChangeLimitationValue(true));
    dispatch(questionActions.switchEditingQuestion(question));
  };

  return (
    <Field
      key={question.id}
      onClick={() => {
        editingFieldHandler(question);
      }}
      isActive={question.id === editingQuestion?.id}
    >
      {question.type !== "2" && (
        <>
          <TitleWrapper>
            <TitleIndex id={question.id} />
            <EditableTitle id={question.id} title={question.title} />
          </TitleWrapper>
          <Note id={question.id} note={question.note} />
        </>
      )}
      {generateResponseQuestion(question.type, question)}
    </Field>
  );
};

export default QuestionField;
