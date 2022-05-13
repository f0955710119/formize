import { questionActions } from "../store/slice/questionSlice";
import { useAppDispatch } from "./useAppDispatch";

const useDeleteQuestionArrayItem = () => {
  const dispatch = useAppDispatch();

  const deleteArrayItemHandler = (
    questionInfo: { id: string; index: number; willEditingArray: string[] },
    actionType: string
  ) => {
    const { id, index, willEditingArray } = questionInfo;
    const updateArray = willEditingArray.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType,
        stringArr: updateArray,
      })
    );
  };

  return deleteArrayItemHandler;
};

export default useDeleteQuestionArrayItem;
