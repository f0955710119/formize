import { userActions } from "../store/slice/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useCheckAnswerValid = (questionId: string) => {
  const { errorMessages, errorMessagesIdKeys } = useAppSelector(
    (state) => state.user
  );
  const questionIdIndex = errorMessagesIdKeys[questionId];
  const dispatch = useAppDispatch();
  const showInvalidHandler = (errorMessage: string) => {
    if (errorMessages[questionIdIndex] === errorMessage) return;
    dispatch(
      userActions.setErrorMessageOfInvalidAnswer({
        questionIdIndex,
        errorMessage,
      })
    );
  };

  return showInvalidHandler;
};

export default useCheckAnswerValid;
