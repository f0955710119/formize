import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import Main from "../../src/components/UI/Main";
import GroupSideBar from "../../src/components/Admin/FormManagement/SideBar/GroupSideBar";
import Dashboard from "../../src/components/Admin/FormManagement/Dashboard/Dashboard";
import Loading from "../../src/components/UI/Loading";

import { adminContext } from "../../src/store/context/adminContext";
import useInitAdminInfo from "../../src/hooks/useInitAdminInfo";
import useCheckUid from "../../src/hooks/useCheckUid";
import useRouterLoaded from "../../src/hooks/useRouterLoaded";
import sweetAlert from "../../src/utils/sweetAlert";

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
  useRouterLoaded(() => fetchAdminData(context.uid));

  const alertRef = useRef<any>(null);

  useEffect(() => {
    router.events.on("routeChangeStart", async () => {
      if (window.location.href.includes("new")) return;
      sweetAlert.errorAlert({ icon: "info", title: "正在準備問卷狀態..." });
    });

    router.events.on("routeChangeComplete", () => {
      sweetAlert.closeAlert();
    });
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
