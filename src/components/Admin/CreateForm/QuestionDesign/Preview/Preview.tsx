import { FC } from "react";
import styled from "styled-components";
import Layout from "../UI/Layout";
import PreviewOneLineTextField from "./Fields/PreviewOneLineTextField";
import PreviewMultiLineTextField from "./Fields/PreviewMultiLineTextField";

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
        <PreviewOneLineTextField />
        <PreviewMultiLineTextField />
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
