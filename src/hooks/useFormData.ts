import { useAppSelector } from "./useAppSelector";

const useFormData = () => {
  const { setting, style, question } = useAppSelector((state) => state);
  const { uid, editingGroupId } = useAppSelector((state) => state.user);

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
