import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";

const useInitAdminInfo = () => {
  const context = useContext(adminContext);

  const initAdminHandler = async (uid: string) => {
    const response = await fetch("/api/admin/group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });

    const adminInfo = await response.json();
    context.setField(adminActionType.UID, uid);
    if (!adminInfo.data) return;
    context.setField(adminActionType.GROUPS, adminInfo.data.groups);
    context.setField(adminActionType.SURVEYS, adminInfo.data.surveys);
  };

  return initAdminHandler;
};

export default useInitAdminInfo;
