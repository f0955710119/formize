import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";
import { Group } from "../types/group";
import helper from "../utils/helper";

const useInitAdminInfo = () => {
  const context = useContext(adminContext);

  const initAdminHandler = async (uid: string) => {
    const response = await fetch("/api/admin/group", {
      method: "GET",
      headers: {
        Authorization: `Basic ${uid}`,
      },
    });

    const adminInfo = await response.json();
    if (adminInfo.status === "fail") {
      console.log(adminInfo.message);
      return;
    }

    context.setField(adminActionType.UID, uid);
    if (!adminInfo.data) return;

    const groups = (adminInfo.data.groups as Group[]).sort((a, b) => {
      const timeA = helper.convertFirebaseTimeToDate(a.createdTime).getTime();
      const timeB = helper.convertFirebaseTimeToDate(b.createdTime).getTime();
      if (timeA > timeB) return 1;
      return -1;
    });
    context.setField(adminActionType.GROUPS, groups);
    context.setField(adminActionType.FORMS, adminInfo.data.forms);
  };

  return initAdminHandler;
};

export default useInitAdminInfo;
