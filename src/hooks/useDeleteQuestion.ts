import settingActinoType from "../store/actionType/settingActionType";
import { questionActions } from "../store/slice/questionSlice";
import { settingActions } from "../store/slice/settingSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useDeleteQuestion = () => {
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const { pageQuantity } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const deleteQuestionHandler = (questionId: string) => {
    dispatch(questionActions.deleteExistedQuestion(questionId));
    dispatch(questionActions.switchEditingQuestion(null));
    dispatch(questionActions.willChangeLimitationValue(true));

    if (editingFormPage === 1 && pageQuantity === 1) return;
    const pageHasOtherQuestions =
      questions.filter((question) => question.page === editingFormPage).length >
      1;
    if (pageHasOtherQuestions) return;

    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActinoType.PAGE_QUANTITY,
        value: pageQuantity - 1,
      })
    );
    dispatch(questionActions.updateQuestionPage({ page: editingFormPage }));
    dispatch(
      questionActions.switchEditingFormPage(
        editingFormPage === 1 ? editingFormPage : editingFormPage - 1
      )
    );
  };

  return deleteQuestionHandler;
};

export default useDeleteQuestion;
