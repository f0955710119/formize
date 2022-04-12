import { FC } from "react";
import styled from "styled-components";
import Preview from "./Preview/Preview";
import QuestionOptions from "./QuestionOptions/QuestionOptions";
import QuestionsList from "./QuestionsList/QuestionsList";

const Layout = styled.main`
  width: 100%;
  display: flex;
  height: calc(100vh - 6rem - 6rem);
  border-top: 1px solid #c8c8c8;
`;

interface QuestionDesignProps {
  setCurrentStep(number: number): void;
}

const QuestionDesign: FC<QuestionDesignProps> = ({
  setCurrentStep,
}: QuestionDesignProps) => {
  return (
    <Layout>
      <Preview />
      <QuestionOptions />
      <QuestionsList />
    </Layout>
  );
};

export default QuestionDesign;
