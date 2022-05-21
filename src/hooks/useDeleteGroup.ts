import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import sweetAlert from "../utils/sweetAlert";
import useInitAdminInfo from "./useInitAdminInfo";

const useDeleteGroup = () => {
  const { uid, groups, editingGroupId } = useContext(adminContext);
  const initAdminHandler = useInitAdminInfo();

  const deleteExistingGroup = async () => {
    const willDeleteGroup =
      groups.length > 0 ? groups.find((group) => group.id === editingGroupId) : undefined;
    const deleteGroupTitle = willDeleteGroup ? willDeleteGroup.name : "";
    const deleteGroupCallback = async () => {
      try {
        sweetAlert.loadingReminderAlert("正在刪除群組...");
        const response = await fetch("/api/admin/group", {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${uid}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupId: editingGroupId }),
        });

        if (!response.ok) throw new Error("連線異常，請稍後再試");

        await initAdminHandler(uid, true);
        sweetAlert.loadedReminderAlert("刪除成功!");
        setTimeout(() => {
          sweetAlert.closeAlert();
        }, 1500);
      } catch (error: any) {
        console.error(error.message);
        sweetAlert.errorReminderAlert("刪除群組失敗，請稍後再嘗試");
      }
    };

    const confirAlertOptions = {
      title: `刪除群組\n${deleteGroupTitle !== "" ? `「${deleteGroupTitle}」` : ""}`,
      text: "刪除群組將遺失其內部的所有問卷，\n會失去大量資料且不可復原，確定要刪除嗎?",
      cancelButtonText: "取消",
      confirmButtonText: "刪除",
      inputLabel: `輸入群組名稱: ${deleteGroupTitle}`,
    };

    const response = await sweetAlert.textInputAlert(confirAlertOptions, deleteGroupTitle);

    if (response.value !== deleteGroupTitle) return;
    await deleteGroupCallback();
  };

  return deleteExistingGroup;
};

export default useDeleteGroup;
