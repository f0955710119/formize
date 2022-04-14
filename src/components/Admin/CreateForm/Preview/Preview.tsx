import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import type { Question } from "../../../../store/slice/questionSlice";

import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import OneChoice from "./Fields/OneChoice";
import MultiChoice from "./Fields/MultiChoice";
import Martix from "./Fields/Martix";
import Slider from "./Fields/Slider";
import SequenceWeight from "./Fields/SequenceWeigth";
import Date from "./Fields/Date";

import Layout from "../UI/Layout";
import Field from "./Fields/UI/Field";
import TitleIndex from "./Fields/UI/TitleIndex";
import EditableTitle from "./Fields/UI/EditableTitle";
import Note from "./Fields/UI/Note";

const PreviewLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0rem;
  background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/images/stacked-waves-haikei.svg");
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 70%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const generateResponseQuestion = (type: string, question: Question) => {
  switch (type) {
    case "0":
      return <OneLineText />;
    case "1":
      return <MultiLineText />;
    case "2":
      return <Introduction />;
    case "3":
      return <OneChoice />;
    case "4":
      return <MultiChoice />;
    case "5":
      return <Martix />;
    case "6":
      return <OneLineText />;
    case "7":
      return <Slider />;
    case "8":
      if (question.options) {
        return <SequenceWeight options={question.options} />;
      }
    case "9":
      return <Date />;
  }
};

const Preview: FC = () => {
  const { questions } = useAppSelector((state) => state.question);
  return (
    <PreviewLayout>
      <QuestionWrapper>
        {questions.map((question) => {
          return (
            <Field key={question.id}>
              <TitleWrapper>
                <TitleIndex id={question.id} />
                <EditableTitle id={question.id} title={question.title} />
              </TitleWrapper>
              <Note id={question.id} note={question.note} />
              {generateResponseQuestion(question.type, question)}
            </Field>
          );
        })}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
