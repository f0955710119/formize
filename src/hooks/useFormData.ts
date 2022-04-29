import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import { useAppSelector } from "./useAppSelector";

const useFormData = () => {
  const { setting, style, question } = useAppSelector((state) => state);
  const { editingGroupId } = useAppSelector((state) => state.admin);
  const uid = useContext(adminContext).uid;

  const sendingFormData = {
    uid,
    groupId: editingGroupId,
    settings: { ...setting },
    questions: [...question.questions],
    styles: { ...style },
  };

  return sendingFormData;
};

export default useFormData;
