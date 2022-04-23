import settingActinoType from "../store/actionType/settingActionType";
import { questionActions } from "../store/slice/questionSlice";
import { settingActions } from "../store/slice/settingSlice";
import { Question } from "../types/question";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useDeleteQuestion = (editingQuestion: Question | null) => {
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const { pageQuantity } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const deleteQuestionHandler = (questionId: string) => {
    dispatch(questionActions.deleteExistedQuestion(questionId));
    // if (!editingQuestion) return;
    // if (editingQuestion.id !== questionId) return;
    dispatch(questionActions.switchEditingQuestion(null));
    dispatch(questionActions.willChangeLimitationValue(true));

    if (editingFormPage === 1) return;
    const pageHasQuestion =
      questions.filter((question) => question.page === editingFormPage).length >
      0;
    if (pageHasQuestion) return;
    console.log(pageQuantity - 1);
    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActinoType.PAGE_QUANTITY,
        value: pageQuantity - 1,
      })
    );
    dispatch(questionActions.switchEditingFormPage(editingFormPage - 1));
  };

  return deleteQuestionHandler;
};

export default useDeleteQuestion;
