import { useEffect, useRef, useState } from "react";
import questionActionType from "../store/actionType/questionActionType";
import { questionActions } from "../store/slice/questionSlice";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";
import useCheckEditingStateOfTextEditingField from "./useCheckEditingStateOfTextEditingField";
import useCloseContentsOfUneditingQuestion from "./useCloseContentsOfUneditingQuestion";

interface EditingQuestionContentInfo {
  stringArr: string[];
  index: number;
  contentType: string;
}

const useEditingQuestionContent = (
  EditingQuestionContentInfo: EditingQuestionContentInfo,
  id: string
) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId, editingOptionQuantity, editingMatrixQuantity } = useAppSelector(
    (state) => state.question
  );
  const { stringArr, index, contentType } = EditingQuestionContentInfo;
  const [editingText, setEditingText] = useState<string>(stringArr[index]);
  const [hasClickedText, setHasClickedText] = useState<boolean>(false);
  const isLoading = useRef<boolean>(true);
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();
  const closeContentHandler = useCloseContentsOfUneditingQuestion(contentType);

  const { setIsEditingOption, setIsEditingMatrix } = questionActions;
  const { OPTIONS, MATRIXS } = questionActionType;
  const isOption = contentType === "option";
  const setIsEditingContentText = isOption ? setIsEditingOption : setIsEditingMatrix;
  const actionType = isOption ? OPTIONS : MATRIXS;
  const isEditingContent = isOption ? editingOptionQuantity : editingMatrixQuantity;
  const editingContentName = isOption ? "選項" : "欄位";

  useEffect(() => {
    if (!isLoading.current) {
      setEditingText(stringArr[index]);
      return;
    }
    isLoading.current = false;
  }, [stringArr]);

  useEffect(() => {
    if (!isLoading.current) {
      const willCloseContent = closeContentHandler(id);
      if (!willCloseContent) return;
      setHasClickedText(false);
      return;
    }
    isLoading.current = false;
  }, [editingQuestionId]);

  const toggleEditingInputHandler = (open: boolean) => {
    setHasClickedText(open);
    dispatch(
      setIsEditingContentText({
        setEditingState: open,
        isReset: false,
      })
    );
  };

  const clickTextHandler = (id: string) => {
    if (editingQuestionId !== id) return;
    if (isEditingContent >= 1) {
      sweetAlert.errorReminderAlert(`請先儲存正在編輯的${editingContentName}唷!`);
      return;
    }
    checkOpenEditingTextHandler(() => {
      toggleEditingInputHandler(true);
    }, id);
  };

  const saveContentCallback = (updateStringArr: string[]) => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType,
        stringArr: updateStringArr,
      })
    );
    setHasClickedText(false);
    dispatch(
      setIsEditingContentText({
        setEditingState: false,
        isReset: false,
      })
    );
  };

  return {
    editingText,
    setEditingText,
    hasClickedText,
    toggleEditingInputHandler,
    clickTextHandler,
    saveContentCallback,
  };
};

export default useEditingQuestionContent;
