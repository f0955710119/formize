import { FC } from "react";
import styled from "styled-components";
import Layout from "../UI/Layout";

import OptionItem from "./OptionItem";
import { Heading } from "../../UI/SectionHeading";

const OptionsLayout = styled(Layout)`
  width: 18%;
`;

const OptionHeading = styled(Heading)`
  margin-bottom: 2rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding-right: 1rem;
  width: 100%;
  height: 35vh;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

const QuestionOptions: FC = () => {
  return (
    <OptionsLayout>
      <OptionHeading>題型</OptionHeading>
      <OptionList>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
        <OptionItem></OptionItem>
      </OptionList>
      <OptionHeading>限制</OptionHeading>
    </OptionsLayout>
  );
};

export default QuestionOptions;
