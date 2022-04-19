import { useAppDispatch } from "./useAppDispatch";
import { questionActions } from "../store/slice/questionSlice";

const useSwitchCurrentStep = () => {
  const dispatch = useAppDispatch();
  const handler = (step: number) => {
    dispatch(questionActions.switchCreatingFormStep(step));
  };
  return handler;
};

export default useSwitchCurrentStep;
