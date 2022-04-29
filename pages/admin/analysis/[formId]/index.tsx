import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Main from "../../../../src/components/UI/Main";
import FormAnalysisSideBar from "../../../../src/components/Admin/FormAnalysis/FormAnalysisSideBar";

const Analysis: NextPage = () => {
  const router = useRouter();
  const [analysisPage, setAnalysisPage] = useState<number>(0);
  const formId = router.query.formId as string;
  const getStaticsAnalysisData = async (formId: string) => {
    const response = await fetch(`/api/admin/analysis/statis/${formId}`);
    const data = await response.json();
    console.log(data);
  };

  // useEffect(() => {
  //   router.isReady && getStaticsAnalysisData(formId);
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
      <Main>
        <FormAnalysisSideBar>st</FormAnalysisSideBar>
      </Main>
    </>
  );
};

export default Analysis;
