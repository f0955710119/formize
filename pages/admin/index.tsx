import styled from "styled-components";
import Head from "next/head";
import type { NextPage } from "next";
import Header from "../../src/components/UI/Header";

import Main from "../../src/components/UI/Main";
import GroupSideBar from "../../src/components/Admin/FormManagement/SideBar/GroupSideBar";
import Dashboard from "../../src/components/Admin/FormManagement/Dashboard/Dashboard";
import { useContext, useEffect, useState } from "react";
import { adminContext } from "../../src/store/context/adminContext";
import { useRouter } from "next/router";
import useInitAdminInfo from "../../src/hooks/useInitAdminInfo";
import useCheckUid from "../../src/hooks/useCheckUid";
import { user } from "../../src/utils/firebase";

const TestLoading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  z-index: 2;

  &::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #333;
    border-color: #333 transparent #333 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Admin: NextPage = () => {
  const context = useContext(adminContext);
  const router = useRouter();
  const checkUidInOtherPageHandler = useCheckUid();
  const [isFetchingAdminData, setIsFetchingAdminData] = useState<boolean>(true);

  const fetchAdminData = async (uid: string) => {
    if (uid === "") {
      const isInvalid = await checkUidInOtherPageHandler();
      if (isInvalid) {
        alert("未登入狀態，將回首頁");
        router.push("/");
      }
      setIsFetchingAdminData(false);
      return;
    }
    await initAdminHandler(uid);
    setIsFetchingAdminData(false);
  };

  const initAdminHandler = useInitAdminInfo();
  useEffect(() => {
    if (!router.isReady) return;
    fetchAdminData(context.uid);
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

      <Main>
        {!isFetchingAdminData ? (
          <>
            <GroupSideBar />
            <Dashboard />
          </>
        ) : (
          <TestLoading />
        )}
      </Main>
    </>
  );
};

export default Admin;
