import type { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";

import LoginForm from "../src/components/LandingPage/LoginForm";

const DefalutMain = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Formize</title>
        <meta name="description" content="Formize - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefalutMain>
        <LoginForm />
      </DefalutMain>
    </div>
  );
};

export default Home;
