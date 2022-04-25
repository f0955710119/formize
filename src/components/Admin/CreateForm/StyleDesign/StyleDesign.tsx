import { FC } from "react";

import Main from "../UI/Main";
import Preview from "../Preview/Preview";
import SettingBar from "./StyleSettings/SettingBar";

const StyleDesign: FC = () => {
  return (
    <Main>
      <Preview />
      <SettingBar />
    </Main>
  );
};

export default StyleDesign;
