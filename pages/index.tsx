import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import LoginForm from "../src/components/LandingPage/LoginForm";
import firebase from "../src/utils/firebase";

const DefalutMain = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: NextPage = () => {
  const isLoading = useRef<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading.current) return;
    isLoading.current = false;
    const unsubscribeAuth = firebase.checkAuthState(router);
    return () => unsubscribeAuth();
  }, []);
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
        <LoginForm />
      </DefalutMain>
    </div>
  );
};

export default Home;
