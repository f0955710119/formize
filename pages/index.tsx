import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import LoginForm from "../src/components/LandingPage/LoginForm";
import useLoginCheck from "../src/hooks/useLoginCheck";

const DefalutMain = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;

  /* background-image: url("images/main-bg.svg"); */
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("images/setting-bg.svg");
  background-repeat: no-repeat;
  /* background-position: 20% 30%; */
  background-size: cover;
`;

const FirstPicture = styled.div`
  position: absolute;
  top: 15%;
  left: 13%;
  width: 40rem;
  height: 50rem;
  border-radius: 9px;
  overflow: hidden;
  background-image: url("images/landing-page.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const SecondPicture = styled.div`
  position: absolute;
  top: 22%;
  left: 27%;
  width: 48rem;
  height: 60rem;

  border-radius: 9px;
  overflow: hidden;

  background-image: url("images/landing-page-2.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
const Home: NextPage = () => {
  useLoginCheck();

  return (
    <div>
      <Head>
        <title>Formize</title>
        <meta name="description" content="Formize - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vidaloka&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <DefalutMain>
        <FirstPicture />
        <SecondPicture />
        <LoginForm />
      </DefalutMain>
    </div>
  );
};

export default Home;
