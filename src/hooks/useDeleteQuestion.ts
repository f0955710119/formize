import { questionActions } from "../store/slice/questionSlice";
import { Question } from "../types/question";
import { useAppDispatch } from "./useAppDispatch";

const useDeleteQuestion = (editingQuestion: Question | null) => {
  const dispatch = useAppDispatch();

  const deleteQuestionHandler = (questionId: string) => {
    dispatch(questionActions.deleteExistedQuestion(questionId));
    // if (!editingQuestion) return;
    // if (editingQuestion.id !== questionId) return;
    dispatch(questionActions.switchEditingQuestion(null));
    dispatch(questionActions.willChangeLimitationValue(true));
  };

  return deleteQuestionHandler;
};

export default useDeleteQuestion;
