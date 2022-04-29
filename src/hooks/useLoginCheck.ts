import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";
import useInitAdminInfo from "./useInitAdminInfo";

const useLoginCheck = () => {
  const initAdminHandler = useInitAdminInfo();
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    async function initLandingPage() {
      try {
        const uid = await firebase.checkAuthState();
        if (typeof uid !== "string") return;
        // dispatch(adminActions.updateLoginState(uid));
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
