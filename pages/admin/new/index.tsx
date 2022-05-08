import { ThemeProvider } from "styled-components";
import useGetTheme from "../../../src/hooks/useGetTheme";
import Head from "next/head";
import type { NextPage } from "next";

import styled from "styled-components";

import Header from "../../../src/components/UI/Header";
import StepHeader from "../../../src/components/Admin/CreateForm/StepHeader";
import SettingForm from "../../../src/components/Admin/CreateForm/Setting/SettingForm";
import QuestionDesign from "../../../src/components/Admin/CreateForm/QuestionDesign/QuestionDesign";
import StyleDesign from "../../../src/components/Admin/CreateForm/StyleDesign/StyleDesign";
import DeployFormSection from "../../../src/components/Admin/CreateForm/DeployForm/DeployFormSection";

import helper from "../../../src/utils/helper";
import themes from "../../../src/store/theme/theme";
import { useAppSelector } from "../../../src/hooks/useAppSelector";
import breakpointConfig from "../../../src/configs/breakpointConfig";
import scrollBar from "../../../src/components/UI/scrollBar";
import { useContext, useEffect, useState } from "react";
import useRouterLoaded from "../../../src/hooks/useRouterLoaded";
import Loading from "../../../src/components/UI/Loading";
import useCheckUid from "../../../src/hooks/useCheckUid";
import { adminContext } from "../../../src/store/context/adminContext";
import useInitAdminInfo from "../../../src/hooks/useInitAdminInfo";
import { useRouter } from "next/router";

const CreateNewPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  @media ${breakpointConfig.laptopM} {
    overflow-x: hidden;
    overflow-y: scroll;
    ${scrollBar}
  }
`;

const New: NextPage = () => {
  const router = useRouter();
  const context = useContext(adminContext);
  const { currentStep } = useAppSelector((state) => state.question);
  const [isFetchingAdminData, setIsFetchingAdminData] = useState<boolean>(true);
  const themeCode = useGetTheme();
  const checkUidInOtherPageHandler = useCheckUid();
  const colorTheme = themes[helper.generateResponseThemePalette(themeCode)];

  const fetchAdminData = async (uid: string) => {
    if (uid === "") {
      const isInvalid = await checkUidInOtherPageHandler();
      if (isInvalid) {
        alert("未登入狀態，將回首頁");
        router.push("/");
      }
      setIsFetchingAdminData(false);
      return;
    }
    await initAdminHandler(uid);
    setIsFetchingAdminData(false);
  };

  const initAdminHandler = useInitAdminInfo();
  useRouterLoaded(() => fetchAdminData(context.uid));

  return (
    <>
      <Head>
        <title>Formize - 問卷進行式</title>
        <meta name="description" content="Formize - 問卷進行式" />
      </Head>
      {isFetchingAdminData ? (
        <Loading
          imageSrc={
            process.env.NEXT_PUBLIC_ORIGIN + "/" + "images/loading-image.svg"
          }
        />
      ) : (
        <CreateNewPageContainer>
          <Header>
            <StepHeader currentStep={currentStep} />
          </Header>

          {currentStep === 1 && <SettingForm />}
          <ThemeProvider theme={colorTheme}>
            {currentStep === 2 && <QuestionDesign />}
            {currentStep === 3 && <StyleDesign />}
          </ThemeProvider>
          {currentStep === 4 && <DeployFormSection />}
        </CreateNewPageContainer>
      )}
    </>
  );
};

export default New;
