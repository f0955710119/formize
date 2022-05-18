import settingActinoType from "../store/actionType/settingActionType";
import { questionActions } from "../store/slice/questionSlice";
import { settingActions } from "../store/slice/settingSlice";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const useDeleteQuestion = () => {
  const { questions } = useAppSelector((state) => state.question);
  const { pageQuantity } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const deleteQuestionHandler = (questionId: string) => {
    const deletingPageQuestion = questions.find(
      (question) => question.id === questionId
    );

    const confirmToDeleteHandler = () => {
      dispatch(questionActions.deleteExistedQuestion(questionId));
      dispatch(questionActions.switchEditingQuestion(null));
      dispatch(questionActions.willChangeLimitationValue(true));

      if (!deletingPageQuestion) throw new Error("沒有對應的題型id");
      const deletingPageQuestionPage = deletingPageQuestion.page;

      if (deletingPageQuestionPage === 1 && pageQuantity === 1) return;

      const pageHasOtherQuestions =
        questions.filter(
          (question) => question.page === deletingPageQuestionPage
        ).length > 1;

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

    const title =
      deletingPageQuestion && deletingPageQuestion.title !== ""
        ? deletingPageQuestion.title
        : "此題";

    sweetAlert.clickToConfirmAlert(
      {
        title: "FORMiZE小提示",
        text: `確定要刪除「${title}」嗎?`,
        cancelButtonText: "繼續留著",
        confirmButtonText: "確定刪除",
        imageUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/images/confirm-delete.svg`,
      },
      confirmToDeleteHandler
    );
  };

  return deleteQuestionHandler;
};

export default useDeleteQuestion;
