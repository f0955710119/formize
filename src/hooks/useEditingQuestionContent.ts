import { useEffect, useRef, useState } from "react";

import questionActionType from "../store/actionType/questionActionType";
import { questionActions } from "../store/slice/questionSlice";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";
import useCheckEditingStateOfTextEditingField from "./useCheckEditingStateOfTextEditingField";
import useCloseContentsOfUneditingQuestion from "./useCloseContentsOfUneditingQuestion";

interface EditingQuestionContentInfo {
  stringCotent: string;
  contentType: string;
}

const useEditingQuestionContent = (
  EditingQuestionContentInfo: EditingQuestionContentInfo,
  id: string
) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId } = useAppSelector((state) => state.question);
  const { stringCotent, contentType } = EditingQuestionContentInfo;
  const [editingText, setEditingText] = useState<string>(stringCotent);
  const [hasClickedText, setHasClickedText] = useState<boolean>(false);
  const isLoading = useRef<boolean>(true);
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();
  const closeContentHandler = useCloseContentsOfUneditingQuestion(contentType);

  const { setIsEditngQuestionContent } = questionActions;
  const { OPTIONS, MATRIXS } = questionActionType;
  const isOption = contentType === "option";
  const actionType = isOption ? OPTIONS : MATRIXS;

  useEffect(() => {
    if (!isLoading.current) {
      setEditingText(stringCotent);
      return;
    }
    isLoading.current = false;
  }, [stringCotent]);

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
      setIsEditngQuestionContent({
        setEditingState: open,
        isReset: false,
        contentType,
      })
    );
  };

  const clickTextHandler = (id: string) => {
    if (editingQuestionId !== id) return;
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
      setIsEditngQuestionContent({
        setEditingState: false,
        isReset: false,
        contentType,
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
