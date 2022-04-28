import { useContext, useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import firebase from "../utils/firebase";
import { adminContext } from "../store/context/adminContext";
import useInitAdminInfo from "./useInitAdminInfo";

const useCheckUid = (uid: string) => {
  const initAdminHandler = useInitAdminInfo();
  // const dispatch = useAppDispatch();
  // const context = useContext(adminContext);
  const checkUidInOtherPage = async (uid: string) => {
    if (uid !== "") return;
    const checkUid = await firebase.checkAuthState();
    if (typeof checkUid !== "string") return;
    initAdminHandler(checkUid);
    // dispatch(adminActions.updateLoginState(checkUid));
  };

  useEffect(() => {
    checkUidInOtherPage(uid);
  }, []);
};

export default useCheckUid;
