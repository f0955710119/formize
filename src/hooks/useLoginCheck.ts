import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import firebase from "../utils/firebase";
import useInitAdminInfo from "./useInitAdminInfo";

const useLoginCheck = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const initAdminHandler = useInitAdminInfo();
  const router = useRouter();
  const initLandingPage = async () => {
    try {
      const uid = await firebase.checkAuthState();
      if (typeof uid !== "string") {
        setLoading(false);
        throw new Error("發生未預期的型態錯誤");
      }
      if (uid === "未登入狀態") {
        setLoading(false);
        return uid;
      }

      await initAdminHandler(uid);
      router.push("/admin");
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    initLandingPage();
  }, []);
  return loading;
};

export default useLoginCheck;
