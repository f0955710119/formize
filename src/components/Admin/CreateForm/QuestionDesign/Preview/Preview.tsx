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

const PreviewLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0rem;
  background-image: url("/images/stacked-waves-haikei.svg");
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
  return (
    <PreviewLayout>
      <QuestionWrapper>
        <OneLineText />
        <MultiLineText />
        <Introduction />
        <OneChoice />
        <MultiChoice />
        <Martix />
        <Slider />
        <SequenceWeight />
        <Date />
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
