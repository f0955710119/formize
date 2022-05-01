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
import { useAppSelector } from "../../../src/hooks/useAppSelector";
const New: NextPage = () => {
  const { currentStep } = useAppSelector((state) => state.question);
  const themeCode = useGetTheme();
  const colorTheme = themes[helper.generateResponseThemePalette(themeCode)];
  return (
    <>
      <Head>
        <title>Formize - 問卷進行式</title>
        <meta name="description" content="Formize - 問卷進行式" />
      </Head>
      <Header>
        <StepHeader currentStep={currentStep} />
      </Header>

      {currentStep === 1 && <SettingForm />}
      <ThemeProvider theme={colorTheme}>
        {currentStep === 2 && <QuestionDesign />}
        {currentStep === 3 && <StyleDesign />}
      </ThemeProvider>
      {currentStep === 4 && <DeployFormSection />}
    </>
  );
};

export default New;
