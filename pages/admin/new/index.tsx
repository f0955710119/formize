import { useState } from "react";
import { ThemeProvider } from "styled-components";
import useGetTheme from "../../../src/hooks/useGetTheme";
import Head from "next/head";
import type { NextPage } from "next";
import Header from "../../../src/components/UI/Header";
import StepHeader from "../../../src/components/Admin/CreateForm/StepHeader";
import SettingForm from "../../../src/components/Admin/CreateForm/Setting/SettingForm";
import QuestionDesign from "../../../src/components/Admin/CreateForm/QuestionDesign/QuestionDesign";
import StyleDesign from "../../../src/components/Admin/CreateForm/StyleDesign/StyleDesign";
import DeployFormSection from "../../../src/components/Admin/CreateForm/DeployForm/DeployFormSection";
import helper from "../../../src/utils/helper";
import themes from "../../../src/store/theme/theme";
const New: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const themeCode = useGetTheme();
  const colorTheme = themes[helper.generateResponseThemePalette(themeCode)];
  return (
    <>
      <Head>
        <title>Formize - 問卷進行式</title>
        <meta name="description" content="Formize - 問卷進行式" />
      </Head>
      <Header />
      <StepHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {currentStep === 1 && <SettingForm setCurrentStep={setCurrentStep} />}
      <ThemeProvider theme={colorTheme}>
        {currentStep === 2 && (
          <QuestionDesign setCurrentStep={setCurrentStep} />
        )}
        {currentStep === 3 && <StyleDesign setCurrentStep={setCurrentStep} />}
      </ThemeProvider>
      {currentStep === 4 && <DeployFormSection />}
    </>
  );
};

export default New;
