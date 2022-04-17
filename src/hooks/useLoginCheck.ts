import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { userActions } from "../store/slice/userSlice";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";

const useLoginCheck = () => {
  const isLoading = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading.current) return;
    async function initLandingPage() {
      try {
        isLoading.current = false;
        const uid = await firebase.checkAuthState(router);
        if (typeof uid !== "string") throw "未登入狀態";
        dispatch(userActions.updateLoginState(uid));
      } catch (error: any) {
        console.error(error.message);
      }
    }
    initLandingPage();
  }, []);
};

export default useLoginCheck;
