import { useRouter } from "next/router";

import { useEffect } from "react";

import firebase from "../utils/firebase";
import useInitAdminInfo from "./useInitAdminInfo";

const useLoginCheck = () => {
  const initAdminHandler = useInitAdminInfo();
  const router = useRouter();
  useEffect(() => {
    async function initLandingPage() {
      try {
        const uid = await firebase.checkAuthState();
        if (typeof uid !== "string") throw new Error("發生未預期的型態錯誤");
        if (uid === "未登入狀態") {
          return uid;
        }

        await initAdminHandler(uid);
        router.push("/admin");
      } catch (error: any) {
        console.error(error);
      }
    }
    initLandingPage();
  }, []);
};

export default useLoginCheck;
