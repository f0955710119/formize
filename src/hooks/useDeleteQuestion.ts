import { useContext } from "react";

import settingActinoType from "../store/actionType/settingActionType";
import { settingContext } from "../store/context/settingContext";
import { questionActions } from "../store/slice/questionSlice";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const useDeleteQuestion = () => {
  const { questions } = useAppSelector((state) => state.question);
  const { pageQuantity, setField } = useContext(settingContext);
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

      if (pageHasOtherQuestions) return;

      setField(settingActinoType.PAGE_QUANTITY, pageQuantity - 1);

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
