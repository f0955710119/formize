import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { UserSurvey } from "../../src/types/userSurvey";

import Survey from "../../src/components/User/Survey";
import userSurveyConfig from "../../src/configs/userSurveyConfig";

const SurveyId: NextPage = () => {
  const initUserForm = useRef<UserSurvey>({
    responseDocId: "",
    questions: userSurveyConfig.initQuestions,
    settings: userSurveyConfig.initSettings,
    styles: userSurveyConfig.initStyles,
  });
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  const router = useRouter();

  const getQuestion = async () => {
    const response = await fetch("/api/user/survey", {
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
    setHasFetchedData(true);
  };

  // useEffect(() => {
  //   router.isReady && getQuestion();
  // }, [router.isReady]);
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
      {hasFetchedData && (
        <Survey
          responseDocId={initUserForm.current.responseDocId}
          questions={initUserForm.current.questions}
          settings={initUserForm.current.settings}
          styles={initUserForm.current.styles}
        />
      )}
    </>
  );
};

export default SurveyId;
