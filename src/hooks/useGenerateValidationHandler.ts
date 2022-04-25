import { useAppDispatch } from "./useAppDispatch";
import type { Question } from "../types/question";
import { questionActions } from "../store/slice/questionSlice";
import questionActionType from "../store/actionType/questionActionType";

const useGenerateValidationHandler = (
  id: string,
  key: string,
  isNumber: boolean = true,
  question: Question,
  valiationHandler?: (value: string) => string | null
) => {
  const dispatch = useAppDispatch();

  const dispatchHandler = (value: string) => {
    try {
      if (valiationHandler) {
        const inValidErrorMessage = valiationHandler(value);
        if (inValidErrorMessage) {
          window.alert(inValidErrorMessage);
          throw inValidErrorMessage;
        }
      }

      if (question === undefined) return;
      dispatch(
        questionActions.updateSiglePropOfQuestion({
          id,
          actionType: questionActionType.VALIDATIONS,
          validations: {
            ...question.validations,
            [`${key}`]: isNumber ? +value : value,
          },
        })
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return dispatchHandler;
};

export default useGenerateValidationHandler;
