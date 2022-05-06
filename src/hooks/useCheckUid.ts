import { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../utils/firebase";
import useInitAdminInfo from "./useInitAdminInfo";

const useCheckUid = () => {
  const router = useRouter();
  const initAdminHandler = useInitAdminInfo();
  const checkUidInOtherPageHandler = async () => {
    try {
      const checkUid = await firebase.checkAuthState();
      if (typeof checkUid !== "string")
        throw new Error("確認登入狀況時，發生未預期的型態錯誤");
      if (checkUid === "未登入狀態") {
        return checkUid;
      }
      await initAdminHandler(checkUid);
      return null;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return checkUidInOtherPageHandler;
  // useEffect(() => {
  //   checkUidInOtherPage();
  // }, []);
};

export default useCheckUid;
