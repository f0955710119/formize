import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { userActions } from "../store/slice/userSlice";
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
        dispatch(userActions.updateLoginState(uid));

        if (!isHomePage) return;

        if (!window.location.href.includes("code")) {
          router.push("/admin");
          return;
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        const response = await fetch("/api/admin/survey/drive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        console.log(data.data.token);
      } catch (error: any) {
        console.error(error);
      }
    }
    initLandingPage();
  }, []);
};

export default useLoginCheck;
