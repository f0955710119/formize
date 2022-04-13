import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const Analysis: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
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
    </>
  );
};

export default Analysis;
