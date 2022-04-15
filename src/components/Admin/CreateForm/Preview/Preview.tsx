import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import QuestionField from "./QuestionField";

import {
  Question,
  questionActions,
} from "../../../../store/slice/questionSlice";

import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import Choice from "./Fields/OneChoice";
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
import { useAppDispatch } from "../../../../hooks/useAppDispatch";

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
  width: 75%;
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

const Preview: FC = () => {
  const { questions } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  return (
    <PreviewLayout>
      <QuestionWrapper>
        {questions.map((question) => (
          <QuestionField question={question} key={question.id} />
        ))}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
