import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import Header from "../../../src/components/UI/Header";
import StepHeader from "../../../src/components/Admin/CreateForm/StepHeader";
import SettingForm from "../../../src/components/Admin/CreateForm/Setting/SettingForm";
import QuestionDesign from "../../../src/components/Admin/CreateForm/QuestionDesign/QuestionDesign";
const New: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  console.log(currentStep);
  return (
    <>
      <Head>
        <title>Formize - 問卷進行式</title>
        <meta name="description" content="Formize - 問卷進行式" />
      </Head>
      <Header />
      <StepHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {currentStep === 1 && <SettingForm setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <QuestionDesign setCurrentStep={setCurrentStep} />}
    </>
  );
};

export default New;
