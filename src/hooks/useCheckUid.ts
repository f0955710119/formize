import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { userActions } from "../store/slice/userSlice";
import firebase from "../utils/firebase";

const useCheckUid = (uid: string) => {
  const dispatch = useAppDispatch();
  const checkUidInOtherPage = async (uid: string) => {
    if (uid !== "") return;

    const checkUid = await firebase.checkAuthState();
    if (typeof checkUid !== "string") return;
    dispatch(userActions.updateLoginState(checkUid));
  };

  useEffect(() => {
    checkUidInOtherPage(uid);
  }, []);
};

export default useCheckUid;
