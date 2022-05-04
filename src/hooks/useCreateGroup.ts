import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";

import type { Group } from "../types/group";

const useCreateGroup = () => {
  const context = useContext(adminContext);
  const createNewGroupHandler = async (newGroupName: string) => {
    if (!newGroupName || newGroupName.trim().length === 0) {
      alert("不可以新增沒有名稱的群組!");
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

    if (!response.ok) throw new Error("新增群組失敗，請聯繫IT部門");

    const data = await response.json();
    const { groupId, createdTime } = data.data;

    if (!groupId) throw new Error("查無此群組而新增失敗，請聯繫IT部門");

    const newGroupObj: Group = {
      id: groupId,
      name: newGroupName,
      forms: [],
      userId: context.uid,
      createdTime,
    };

    const updateGropus = [...context.groups, newGroupObj];
    context.setField(adminActionType.GROUPS, updateGropus);
  };
  return createNewGroupHandler;
};

export default useCreateGroup;
