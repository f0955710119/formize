import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { FC, useRef, useState } from "react";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import styled, { ThemeProvider } from "styled-components";

import Loading from "../../src/components/UI/Loading";
import Form from "../../src/components/UserPage/Form";
import userFormConfig from "../../src/configs/userFormConfig";
import useAppDispatch from "../../src/hooks/useAppDispatch";
import useRouterLoaded from "../../src/hooks/useRouterLoaded";
import { userActions } from "../../src/store/slice/userSlice";
import themes from "../../src/store/theme/theme";
import type { UserForm } from "../../src/types/userForm";
import helper from "../../src/utils/helper";
import Logo from "../../src/components/UI/Logo";

const UnexistedForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url("/images/blob-scene-haikei (1).svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const UnexistedFormImage = styled.img`
  display: inline-block;
  margin-bottom: 1rem;
  margin-top: 2rem;
  width: 50%;
  height: 35%;
`;

const UnexistedFormText = styled.span`
  display: block;
  font-size: 2rem;
  text-align: center;
`;

const UnexistedFormReminder: FC = () => {
  return (
    <>
      <UnexistedForm>
        <Logo />
        <UnexistedFormImage
          src={`${origin}/images/comfirm-img.svg`}
          alt="display an unfound FORMiZE form"
        />
        <UnexistedFormText>
          這份問卷已經不存在了唷！
          <br />
          按上方LOGO回到FORMiZE的首頁
        </UnexistedFormText>
      </UnexistedForm>
    </>
  );
};

const FormId: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { initQuestions, initSettings, initStyles } = userFormConfig;
  const initUserForm = useRef<UserForm>({
    responseDocId: "",
    questions: initQuestions,
    settings: initSettings,
    style: initStyles,
  });

  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
  const [hasData, setHasData] = useState<boolean>(true);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<{ [key: string]: string }>({});

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: colorTheme.title ? colorTheme.title : "#777",
      },
    },
  });

  const getQuestion = async () => {
    const response = await fetch("/api/user/form", {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify(router.query),
    });
    if (response.status === 500) {
      setHasData(false);
      return;
    }
    const data = await response.json();

    const { responseDocId, questions, settings, style } = data.data;
    initUserForm.current = {
      responseDocId,
      questions,
      settings,
      style,
    };
    const themeKey = initUserForm.current.style.theme;
    const colorTheme = themes[helper.generateResponseThemePalette(themeKey)];
    setColorTheme(colorTheme);
    setHasFetchedData(true);
    setIsFetchingData(false);
  };

  const initForm = async () => {
    await getQuestion();
    dispatch(userActions.setUpQuestionInitList(initUserForm.current.questions));
  };
  const hasNoColorTheme = hasFetchedData && Object.keys(colorTheme).length === 0;

  useRouterLoaded(() => initForm());
  const origin = process.env.NEXT_PUBLIC_ORIGIN;
  const { responseDocId, questions, settings, style } = initUserForm.current;
  const formProps = {
    responseDocId,
    questions,
    settings,
    style,
  };

  return (
    <>
      <Head>
        <title>FORMiZE - 問卷填答</title>
        <meta name="description" content="FORMiZE - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/formize.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vidaloka&display=swap"
          rel="stylesheet"
        />
      </Head>
      {isFetchingData ? (
        <>
          {hasData && <Loading imageSrc={`${origin}/images/loading-image.svg`} />}
          {!hasData && <UnexistedFormReminder />}
        </>
      ) : (
        <>
          {hasNoColorTheme && <Form {...formProps} />}
          {!hasNoColorTheme && (
            <MUIThemeProvider theme={muiTheme}>
              <ThemeProvider theme={colorTheme}>
                <Form {...formProps} />
              </ThemeProvider>
            </MUIThemeProvider>
          )}
        </>
      )}
    </>
  );
};

export default FormId;
