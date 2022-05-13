import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";

import type { Group } from "../types/group";
import sweetAlert from "../utils/sweetAlert";

const useCreateGroup = () => {
  const context = useContext(adminContext);
  const createNewGroupHandler = async (newGroupName: string) => {
    sweetAlert.loadingReminderAlert("建立新的群組中...");
    if (!newGroupName || newGroupName.trim().length === 0) {
      sweetAlert.errorReminderAlert("不可以新增沒有名稱的群組！");
      return;
    }

    const hasExistingGroupName =
      context.groups.length > 0
        ? context.groups.find((group) => group.name === newGroupName)
          ? true
          : false
        : false;

    if (hasExistingGroupName) {
      sweetAlert.errorReminderAlert("不可以新增重複名稱的群組！");
      return;
    }

    const response = await fetch("/api/admin/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${context.uid}`,
      },
      body: JSON.stringify({ newGroupName }),
    });

    if (!response.ok) {
      sweetAlert.errorReminderAlert("新增群組失敗，請聯繫IT部門");
      return;
    }

    const data = await response.json();
    const { groupId, createdTime } = data.data;

    if (!groupId) {
      sweetAlert.errorReminderAlert("查無此群組而新增失敗，請聯繫IT部門");
      return;
    }

    const newGroupObj: Group = {
      id: groupId,
      name: newGroupName,
      forms: [],
      userId: context.uid,
      createdTime,
    };

    const updateGropus = [...context.groups, newGroupObj];
    context.setField(adminActionType.GROUPS, updateGropus);

    sweetAlert.loadedReminderAlert("成功建立群組！");
    setTimeout(() => {
      sweetAlert.closeAlert();
    }, 1500);
  };
  return createNewGroupHandler;
};

export default useCreateGroup;
