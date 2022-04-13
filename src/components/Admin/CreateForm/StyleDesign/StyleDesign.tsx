import { FC } from "react";
import styled from "styled-components";
import Main from "../UI/Main";
import Preview from "../Preview/Preview";
import SettingBar from "./StyleSettings/SettingBar";

interface StyleDesignProps {
  setCurrentStep(number: number): void;
}

const StyleDesign: FC<StyleDesignProps> = ({
  setCurrentStep,
}: StyleDesignProps) => {
  return (
    <Main>
      <Preview />
      <SettingBar setCurrentStep={setCurrentStep} />
    </Main>
  );
};

export default StyleDesign;
