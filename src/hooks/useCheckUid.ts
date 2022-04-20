import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import firebase from "../utils/firebase";

const useCheckUid = (uid: string) => {
  const dispatch = useAppDispatch();
  const checkUidInOtherPage = async (uid: string) => {
    if (uid !== "") return;

    const checkUid = await firebase.checkAuthState();
    if (typeof checkUid !== "string") return;
    dispatch(adminActions.updateLoginState(checkUid));
  };

  useEffect(() => {
    checkUidInOtherPage(uid);
  }, []);
};

export default useCheckUid;
