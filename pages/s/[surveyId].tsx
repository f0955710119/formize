import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";

import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { UserSurvey } from "../../src/types/userSurvey";

import Survey from "../../src/components/User/Survey";
import userSurveyConfig from "../../src/configs/userSurveyConfig";
import helper from "../../src/utils/helper";
import themes from "../../src/store/theme/theme";
import { useAppDispatch } from "../../src/hooks/useAppDispatch";
import { userActions } from "../../src/store/slice/userSlice";

const SurveyId: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initUserSurvey = useRef<UserSurvey>({
    responseDocId: "",
    questions: userSurveyConfig.initQuestions,
    settings: userSurveyConfig.initSettings,
    styles: userSurveyConfig.initStyles,
  });
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<{ [key: string]: string }>({});

  const getQuestion = async () => {
    const response = await fetch("/api/user/survey", {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify(router.query),
    });
    const data = await response.json();
    const { responseDocId, questions, settings, styles } = data.data;
    initUserSurvey.current = {
      responseDocId,
      questions,
      settings,
      styles,
    };
    const themeKey = initUserSurvey.current.styles.theme;
    const colorTheme = themes[helper.generateResponseThemePalette(themeKey)];
    setColorTheme(colorTheme);
    setHasFetchedData(true);
  };

  const initSurvey = async () => {
    await getQuestion();
    dispatch(
      userActions.setUpQuestionInitList(initUserSurvey.current.questions)
    );
    dispatch(userActions.setUpQuestionIdKeys(initUserSurvey.current.questions));
  };
  const hasColorTheme = hasFetchedData && Object.keys(colorTheme).length === 0;

  useEffect(() => {
    router.isReady && initSurvey();
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>Formize</title>
        <meta name="description" content="Formize - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vidaloka&display=swap"
          rel="stylesheet"
        />
      </Head>
      {hasColorTheme ? (
        <Survey
          responseDocId={initUserSurvey.current.responseDocId}
          questions={initUserSurvey.current.questions}
          settings={initUserSurvey.current.settings}
          styles={initUserSurvey.current.styles}
        />
      ) : (
        <ThemeProvider theme={colorTheme}>
          <Survey
            responseDocId={initUserSurvey.current.responseDocId}
            questions={initUserSurvey.current.questions}
            settings={initUserSurvey.current.settings}
            styles={initUserSurvey.current.styles}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export default SurveyId;
