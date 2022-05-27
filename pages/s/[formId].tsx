import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useRef, useState } from "react";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ThemeProvider } from "styled-components";

import Loading from "../../src/components/UI/Loading";
import Form from "../../src/components/UserPage/Form";
import userFormConfig from "../../src/configs/userFormConfig";
import useAppDispatch from "../../src/hooks/useAppDispatch";
import useRouterLoaded from "../../src/hooks/useRouterLoaded";
import { userActions } from "../../src/store/slice/userSlice";
import themes from "../../src/store/theme/theme";
import type { UserForm } from "../../src/types/userForm";
import helper from "../../src/utils/helper";

const FormId: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initUserForm = useRef<UserForm>({
    responseDocId: "",
    questions: userFormConfig.initQuestions,
    settings: userFormConfig.initSettings,
    style: userFormConfig.initStyles,
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
          style={initUserForm.current.style}
        />
      ) : (
        <MUIThemeProvider theme={muiTheme}>
          <ThemeProvider theme={colorTheme}>
            <Form
              responseDocId={initUserForm.current.responseDocId}
              questions={initUserForm.current.questions}
              settings={initUserForm.current.settings}
              style={initUserForm.current.style}
            />
          </ThemeProvider>
        </MUIThemeProvider>
      )}
    </>
  );
};

export default FormId;
