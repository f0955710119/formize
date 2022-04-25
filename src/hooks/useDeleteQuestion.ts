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

    const deletingPageQuestion = questions.find(
      (question) => question.id === questionId
    );
    if (!deletingPageQuestion) throw new Error("沒有對應的題型id");
    const deletingPageQuestionPage = deletingPageQuestion.page;

    if (deletingPageQuestionPage === 1 && pageQuantity === 1) return;
    // BUG: 之後可以改成用KEY去找對應的ARRAY INDEX

    const pageHasOtherQuestions =
      questions.filter((question) => question.page === deletingPageQuestionPage)
        .length > 1;

    console.log(pageHasOtherQuestions);
    if (pageHasOtherQuestions) return;

    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActinoType.PAGE_QUANTITY,
        value: pageQuantity - 1,
      })
    );
    dispatch(
      questionActions.updateQuestionPage({ page: deletingPageQuestionPage })
    );
    dispatch(
      questionActions.switchEditingFormPage(
        deletingPageQuestionPage === 1
          ? deletingPageQuestionPage
          : deletingPageQuestionPage - 1
      )
    );
  };

  return deleteQuestionHandler;
};

export default useDeleteQuestion;
