import type { NextPage } from "next";
import Head from "next/head";

import styled from "styled-components";

import LoginForm from "../src/components/LandingPage/LoginForm";
import breakpointConfig from "../src/configs/breakpointConfig";
import useLoginCheck from "../src/hooks/useLoginCheck";

const DefalutMain = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("images/blob-scene-haikei (1).svg");
  background-repeat: no-repeat;
  background-size: cover;

  @media ${breakpointConfig.tablet} {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url("images/blob-scene-haikei (1).svg");
    overflow: hidden;
  }
`;

const FirstPicture = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 40rem;
  height: 50rem;
  border-radius: 9px;
  overflow: hidden;
  background-image: url("images/landing-page.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;

  @media ${breakpointConfig.desktopS} {
    width: 32rem;
    height: 40rem;
  }

  @media ${breakpointConfig.laptopL} {
    display: none;
  }
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
  z-index: 2;

  @media ${breakpointConfig.desktopS} {
    width: 40rem;
    height: 50rem;
  }

  @media ${breakpointConfig.laptopL} {
    left: 20%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media ${breakpointConfig.laptopM} {
    display: none;
  }
`;
const Home: NextPage = () => {
  useLoginCheck();

  return (
    <div>
      <Head>
        <title>FORMiZE - 簡易上手的質感問卷工具</title>
        <meta name="description" content="FORMiZE - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/formize.ico" />
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
