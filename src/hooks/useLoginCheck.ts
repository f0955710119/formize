import { useEffect } from "react";
import firebase from "../utils/firebase";
import { useRouter } from "next/router";
import useInitAdminInfo from "./useInitAdminInfo";

const useLoginCheck = () => {
  const initAdminHandler = useInitAdminInfo();
  const router = useRouter();
  useEffect(() => {
    async function initLandingPage() {
      try {
        const uid = await firebase.checkAuthState();
        if (typeof uid !== "string") return;
        console.log(uid);
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
