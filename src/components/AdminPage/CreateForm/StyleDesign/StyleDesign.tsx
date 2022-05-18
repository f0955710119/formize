import { FC } from "react";

import Main from "../UI/Main";
import Preview from "../Preview/Preview";
import SettingBar from "./StyleSettings/SettingBar";
import QuestionsList from "../QuestionDesign/QuestionsList/QuestionsList";

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
