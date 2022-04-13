import { FC } from "react";
import styled from "styled-components";
import Main from "../UI/Main";
import Preview from "../Preview/Preview";
import QuestionOptions from "./QuestionOptions/QuestionOptions";
import QuestionsList from "./QuestionsList/QuestionsList";

interface QuestionDesignProps {
  setCurrentStep(number: number): void;
}

const QuestionDesign: FC<QuestionDesignProps> = ({
  setCurrentStep,
}: QuestionDesignProps) => {
  return (
    <Main>
      <Preview />
      <QuestionOptions />
      <QuestionsList setCurrentStep={setCurrentStep} />
    </Main>
  );
};

export default QuestionDesign;
