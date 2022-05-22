import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useContext, useState } from "react";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import styled, { ThemeProvider } from "styled-components";

import DeployFormSection from "../../../src/components/AdminPage/CreateForm/DeployForm/DeployFormSection";
import QuestionDesign from "../../../src/components/AdminPage/CreateForm/QuestionDesign/QuestionDesign";
import SettingForm from "../../../src/components/AdminPage/CreateForm/Setting/SettingForm";
import StepHeader from "../../../src/components/AdminPage/CreateForm/StepHeader";
import StyleDesign from "../../../src/components/AdminPage/CreateForm/StyleDesign/StyleDesign";
import Header from "../../../src/components/UI/Header";
import Loading from "../../../src/components/UI/Loading";
import scrollBar from "../../../src/components/UI/scrollBar";
import breakpointConfig from "../../../src/configs/breakpointConfig";
import useAppSelector from "../../../src/hooks/useAppSelector";
import useGetTheme from "../../../src/hooks/useGetTheme";
import useRouterLoaded from "../../../src/hooks/useRouterLoaded";
import { adminContext } from "../../../src/store/context/adminContext";
import { SettingContextProvider } from "../../../src/store/context/settingContext";
import themes from "../../../src/store/theme/theme";
import helper from "../../../src/utils/helper";
import sweetAlert from "../../../src/utils/sweetAlert";
import { StyleContextProvider } from "../../../src/store/context/styleContext";

const CreateNewPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  @media ${breakpointConfig.laptopM} {
    overflow-x: hidden;
    overflow-y: scroll;
    ${scrollBar}
  }
`;

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#c9ab59",
    },
  },
});

const New: NextPage = () => {
  const router = useRouter();
  const context = useContext(adminContext);
  const { currentStep } = useAppSelector((state) => state.question);
  const [isFetchingAdminData, setIsFetchingAdminData] = useState<boolean>(true);
  const themeCode = useGetTheme();
  const colorTheme = themes[helper.generateResponseThemePalette(themeCode)];

  const fetchAdminData = async (uid: string) => {
    if (uid !== "") {
      setIsFetchingAdminData(false);
      sweetAlert.loadedReminderAlert("準備完成，開始創造問卷囉!");
      setTimeout(() => {
        sweetAlert.closeAlert();
      }, 1500);

      return;
    }
    router.push("/admin");
  };

  useRouterLoaded(() => fetchAdminData(context.uid));

  return (
    <>
      <Head>
        <title>FORMiZE - 問卷進行式</title>
        <meta name="description" content="FORMiZE - 問卷進行式" />
      </Head>
      {isFetchingAdminData ? (
        <Loading imageSrc={process.env.NEXT_PUBLIC_ORIGIN + "/" + "images/loading-image.svg"} />
      ) : (
        <MUIThemeProvider theme={muiTheme}>
          <CreateNewPageContainer>
            <SettingContextProvider>
              <Header>
                <StepHeader currentStep={currentStep} />
              </Header>
              {currentStep === 1 && <SettingForm />}
              <ThemeProvider theme={colorTheme}>
                {currentStep === 2 && <QuestionDesign />}
                {currentStep === 3 && <StyleDesign />}
              </ThemeProvider>
              {currentStep === 4 && <DeployFormSection />}
            </SettingContextProvider>
          </CreateNewPageContainer>
        </MUIThemeProvider>
      )}
    </>
  );
};

export default New;
