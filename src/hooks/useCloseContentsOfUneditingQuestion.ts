import { questionActions } from "../store/slice/questionSlice";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

const useCloseContentsOfUneditingQuestion = (contentType: string) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId } = useAppSelector((state) => state.question);
  const { setIsEditingOption, setIsEditingMatrix } = questionActions;
  const setIsEditingContext =
    contentType === "option" ? setIsEditingOption : setIsEditingMatrix;
  const closeContentHandler = (id: string) => {
    if (editingQuestionId === null) return false;

    if (editingQuestionId === id) return false;
    dispatch(
      setIsEditingContext({
        setEditingState: false,
        isReset: true,
      })
    );
    return true;
  };

  return closeContentHandler;
};

export default useCloseContentsOfUneditingQuestion;
