import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { UserForm } from "../../src/types/userForm";

import Form from "../../src/components/User/Form";
import userFormConfig from "../../src/configs/userFormConfig";
import helper from "../../src/utils/helper";
import themes from "../../src/store/theme/theme";
import { useAppDispatch } from "../../src/hooks/useAppDispatch";
import { userActions } from "../../src/store/slice/userSlice";
import useRouterLoaded from "../../src/hooks/useRouterLoaded";
import Loading from "../../src/components/UI/Loading";

const FormId: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initUserForm = useRef<UserForm>({
    responseDocId: "",
    questions: userFormConfig.initQuestions,
    settings: userFormConfig.initSettings,
    styles: userFormConfig.initStyles,
  });

  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<{ [key: string]: string }>({});

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: colorTheme.title ? colorTheme.title : "#777",
      },
    },
  });
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

  const getQuestion = async () => {
    const response = await fetch("/api/user/form", {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify(router.query),
    });
    const data = await response.json();
    const { responseDocId, questions, settings, styles } = data.data;
    initUserForm.current = {
      responseDocId,
      questions,
      settings,
      styles,
    };
    const themeKey = initUserForm.current.styles.theme;
    const colorTheme = themes[helper.generateResponseThemePalette(themeKey)];
    setColorTheme(colorTheme);
    setHasFetchedData(true);
  };

  const initForm = async () => {
    await getQuestion();
    dispatch(userActions.setUpQuestionInitList(initUserForm.current.questions));
    setIsFetchingData(false);
  };
  const hasColorTheme = hasFetchedData && Object.keys(colorTheme).length === 0;

  useRouterLoaded(() => initForm());

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
        <Loading
          imageSrc={
            process.env.NEXT_PUBLIC_ORIGIN + "/" + "images/loading-image.svg"
          }
        />
      ) : hasColorTheme ? (
        <Form
          responseDocId={initUserForm.current.responseDocId}
          questions={initUserForm.current.questions}
          settings={initUserForm.current.settings}
          styles={initUserForm.current.styles}
        />
      ) : (
        <MUIThemeProvider theme={muiTheme}>
          <ThemeProvider theme={colorTheme}>
            <Form
              responseDocId={initUserForm.current.responseDocId}
              questions={initUserForm.current.questions}
              settings={initUserForm.current.settings}
              styles={initUserForm.current.styles}
            />
          </ThemeProvider>
        </MUIThemeProvider>
      )}
    </>
  );
};

export default FormId;
