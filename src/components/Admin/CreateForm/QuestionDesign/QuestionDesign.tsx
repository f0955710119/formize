import { FC } from "react";
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
    // 未來做冒泡機制來dispatch editingQuestion
    <Main onClick={(event) => console.log(event.currentTarget)}>
      <Preview />
      <QuestionOptions />
      <QuestionsList setCurrentStep={setCurrentStep} />
    </Main>
  );
};

export default QuestionDesign;
