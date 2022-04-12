import Head from "next/head";
import type { NextPage } from "next";
import Header from "../../src/components/UI/Header";
import StepHeader from "../../src/components/Admin/CreateForm/StepHeader";
const New: NextPage = () => {
  return (
    <>
      {/* <Head>
        <title>Formize</title>
        <meta name="description" content="Formize - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vidaloka&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Header />
      <StepHeader />
    </>
  );
};

export default New;
