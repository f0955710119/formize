import { FC } from "react";

import Preview from "../Preview/Preview";
import Main from "../UI/Main";
import QuestionOptions from "./QuestionOptions/QuestionOptions";
import QuestionsList from "./QuestionsList/QuestionsList";

const QuestionDesign: FC = () => {
  return (
    <Main>
      <QuestionsList />
      <Preview />
      <QuestionOptions />
    </Main>
  );
};

export default QuestionDesign;
