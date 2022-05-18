import { questionActions } from "../store/slice/questionSlice";
import useAppDispatch from "./useAppDispatch";

const useSwitchCurrentStep = () => {
  const dispatch = useAppDispatch();
  const handler = (step: number) => {
    dispatch(questionActions.switchCreatingFormStep(step));
  };
  return handler;
};

export default useSwitchCurrentStep;
