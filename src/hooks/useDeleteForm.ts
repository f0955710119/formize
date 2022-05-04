import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import useInitAdminInfo from "./useInitAdminInfo";

const useDeleteForm = () => {
  const context = useContext(adminContext);
  const initAdminHandler = useInitAdminInfo();
  const deleteFormHandler = async (formId: string) => {
    try {
      const resposne = await fetch("/api/admin/form", {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${context.uid}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId }),
      });

      const data = await resposne.json();
      if (data.status !== "success") throw new Error(data.message);
      await initAdminHandler(context.uid, true, true);
      alert("成功刪除問卷!");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return deleteFormHandler;
};

export default useDeleteForm;
