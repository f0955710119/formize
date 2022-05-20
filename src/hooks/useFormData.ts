import { useContext } from "react";

import { adminContext } from "../store/context/adminContext";
import { settingContext } from "../store/context/settingContext";
import { styleContext } from "../store/context/styleContext";
import useAppSelector from "./useAppSelector";

const useFormData = () => {
  const { question } = useAppSelector((state) => state);
  const { theme, font, backgroundImage } = useContext(styleContext);
  const context = useContext(adminContext);
  const settingContextData = useContext(settingContext);
  const { uid, editingGroupId } = context;

  const sendingFormData = {
    uid,
    groupId: editingGroupId,
    questions: [...question.questions],
    style: { theme, font, backgroundImage },
    settingContextData: { ...settingContextData },
  };

  return sendingFormData;
};

export default useFormData;
