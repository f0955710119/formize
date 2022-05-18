import { FC } from "react";

import Preview from "../Preview/Preview";
import QuestionsList from "../QuestionDesign/QuestionsList/QuestionsList";
import Main from "../UI/Main";
import SettingBar from "./StyleSettings/SettingBar";

const StyleDesign: FC = () => {
  return (
    <Main>
      <QuestionsList />
      <Preview />
      <SettingBar />
    </Main>
  );
};

export default StyleDesign;
