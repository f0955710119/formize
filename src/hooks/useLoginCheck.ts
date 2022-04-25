import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

const useLoginCheck = (isHomePage: boolean = false) => {
  const isLoading = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading.current) return;
    async function initLandingPage() {
      try {
        isLoading.current = false;
        const uid = await firebase.checkAuthState();
        if (typeof uid !== "string") throw "未登入狀態";
        dispatch(adminActions.updateLoginState(uid));

        if (!isHomePage) return;
        router.push("/admin");
      } catch (error: any) {
        console.error(error);
      }
    }
    initLandingPage();
  }, []);
};

export default useLoginCheck;
