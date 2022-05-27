import { questionActions } from "../store/slice/questionSlice";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const useCloseContentsOfUneditingQuestion = (contentType: string) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId } = useAppSelector((state) => state.question);
  const { setIsEditngQuestionContent } = questionActions;

  const closeContentHandler = (id: string) => {
    if (editingQuestionId === null) return false;
    if (editingQuestionId === id) return false;
    dispatch(
      setIsEditngQuestionContent({
        setEditingState: false,
        isReset: true,
        contentType,
      })
    );
    return true;
  };

  return closeContentHandler;
};

export default useCloseContentsOfUneditingQuestion;
