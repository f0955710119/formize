import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Question } from "../../src/types/question";

const SurveyId: NextPage = () => {
  const [questions, setQuestions] = useState<any>();
  const router = useRouter();
  const isLoading = useRef<boolean>(true);

  useEffect(() => {
    if (!isLoading.current) return;
    async function getQuestion() {
      isLoading.current = false;
      const response = await fetch("/api/user/survey", {
        method: "POST",
        headers: { ContentType: "application/json" },
        body: JSON.stringify(router.query),
      });
      const data = await response.json();
      setQuestions(data.data);
    }
    getQuestion();
  }, []);
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
      <div>{JSON.stringify(questions)}</div>
    </>
  );
};

export default SurveyId;
