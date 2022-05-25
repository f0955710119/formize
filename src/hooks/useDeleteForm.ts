import { useContext } from "react";

import { adminContext } from "../store/context/adminContext";
import sweetAlert from "../utils/sweetAlert";
import useInitAdminInfo from "./useInitAdminInfo";

const useDeleteForm = () => {
  const { uid } = useContext(adminContext);
  const initAdminHandler = useInitAdminInfo();

  const deleteFormHandler = async (formId: string, formName: string) => {
    const deleteFormCallback = async () => {
      sweetAlert.loadingReminderAlert("刪除問卷中...");
      try {
        const resposne = await fetch("/api/admin/form", {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${uid}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formId }),
        });

        const data = await resposne.json();
        if (data.status !== "success") throw new Error(data.message);
        await initAdminHandler(uid, false);
        sweetAlert.loadedReminderAlert("成功刪除問卷！");
        setTimeout(() => {
          sweetAlert.closeAlert();
        }, 1500);
      } catch (error: any) {
        console.error(error.message);
        sweetAlert.errorReminderAlert("刪除問卷失敗，請稍後再試");
      }
    };
    const response = await sweetAlert.textInputAlert(
      {
        title: `刪除問卷\n${formName !== "" ? `「${formName}」` : ""}`,
        text: "您將要把整份問卷的題目跟統計資料都遺棄，\n此動作不可復原，確定要執行刪除嗎?",
        cancelButtonText: "取消",
        confirmButtonText: "刪除",
        inputLabel: "輸入問卷名稱: " + formName,
      },
      formName
    );

    if (response.value !== formName) return;
    await deleteFormCallback();
  };

  return deleteFormHandler;
};

export default useDeleteForm;
