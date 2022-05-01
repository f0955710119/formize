import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";
import { Group } from "../types/group";

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

    const groups = (adminInfo.data.groups as Group[]).sort((a, b) => {
      if (a.createdTime > b.createdTime) return 1;
      return -1;
    });

    context.setField(adminActionType.GROUPS, groups);
    context.setField(adminActionType.FORMS, adminInfo.data.forms);
  };

  return initAdminHandler;
};

export default useInitAdminInfo;
