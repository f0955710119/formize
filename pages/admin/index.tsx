import { StringFormat } from "firebase/storage";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useContext, useState } from "react";

import Dashboard from "../../src/components/AdminPage/FormManagement/Dashboard/Dashboard";
import GroupSideBar from "../../src/components/AdminPage/FormManagement/SideBar/GroupSideBar";
import Loading from "../../src/components/UI/Loading";
import Main from "../../src/components/UI/Main";
import useCheckUid from "../../src/hooks/useCheckUid";
import useInitAdminInfo from "../../src/hooks/useInitAdminInfo";
import useRouterLoaded from "../../src/hooks/useRouterLoaded";
import { adminContext } from "../../src/store/context/adminContext";

const Admin: NextPage = () => {
  const { uid } = useContext(adminContext);
  const router = useRouter();
  const checkUidInOtherPageHandler = useCheckUid();
  const [isFetchingAdminData, setIsFetchingAdminData] = useState<boolean>(true);

  const initAdminHandler = useInitAdminInfo();
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

  useRouterLoaded(() => fetchAdminData(uid));

  return (
    <>
      <Head>
        <title>FORMiZE</title>
        <meta name="description" content="FORMiZE - 簡易上手的質感問卷工具" />
        <link rel="icon" href="/formize.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vidaloka&display=swap"
          rel="stylesheet"
        />
      </Head>
      {isFetchingAdminData ? (
        <Loading />
      ) : (
        <>
          <Main>
            <GroupSideBar />
            <Dashboard />
          </Main>
        </>
      )}
    </>
  );
};

export default Admin;
