import { FC } from "react";
import styled from "styled-components";
import Layout from "../UI/Layout";
import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import OneChoice from "./Fields/OneChoice";
import MultiChoice from "./Fields/MultiChoice";
import Martix from "./Fields/Martix";
import Slider from "./Fields/Slider";
import SequenceWeight from "./Fields/SequenceWeigth";
import Date from "./Fields/Date";
import { useAppSelector } from "../../../../hooks/useAppSelector";

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

const Preview: FC = () => {
  const { questions } = useAppSelector((state) => state.question);
  return (
    <PreviewLayout>
      <QuestionWrapper>
        {questions.map((question) => {
          switch (question.type) {
            case "0":
              return <OneLineText key={question.id} />;
            case "1":
              return <MultiLineText key={question.id} />;
            case "2":
              return <Introduction key={question.id} />;
            case "3":
              return <OneChoice key={question.id} />;
            case "4":
              return <MultiChoice key={question.id} />;
            case "5":
              return <Martix key={question.id} />;
            case "6":
              return <OneLineText key={question.id} />;
            case "7":
              return <Slider key={question.id} />;
            case "8":
              return <SequenceWeight key={question.id} />;
            case "9":
              return <Date key={question.id} />;
          }
        })}
        {/* <OneLineText />
        <MultiLineText />
        <Introduction />
        <OneChoice />
        <MultiChoice />
        <Martix />
        <Slider />
        <SequenceWeight />
        <Date /> */}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
