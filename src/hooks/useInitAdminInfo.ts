import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";

const useInitAdminInfo = () => {
  const context = useContext(adminContext);

  const initAdminHandler = async (uid: string) => {
    const response = await fetch("/api/admin/group", {
      method: "GET",
      headers: {
        Authorization: uid,
      },
    });

    const adminInfo = await response.json();
    context.setField(adminActionType.UID, uid);
    if (!adminInfo.data) return;
    context.setField(adminActionType.GROUPS, adminInfo.data.groups);
    context.setField(adminActionType.FORMS, adminInfo.data.forms);
  };

  return initAdminHandler;
};

export default useInitAdminInfo;
