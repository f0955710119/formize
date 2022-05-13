import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import { settingContext } from "../store/context/settingContext";
import { useAppSelector } from "./useAppSelector";

const useFormData = () => {
  const { setting, style, question } = useAppSelector((state) => state);
  const context = useContext(adminContext);
  const settingContextData = useContext(settingContext);
  const { uid, editingGroupId } = context;

  const sendingFormData = {
    uid,
    groupId: editingGroupId,
    settings: { ...setting },
    questions: [...question.questions],
    styles: { ...style },
    settingContextData: { ...settingContextData },
  };

  return sendingFormData;
};

export default useFormData;
