import { questionActions } from "../store/slice/questionSlice";
import { styleActions } from "../store/slice/styleSlice";
import useAppDispatch from "./useAppDispatch";

const useInitNewForm = () => {
  const dispatch = useAppDispatch();

  const initHandler = () => {
    dispatch(questionActions.initQuestion());
    dispatch(styleActions.initStyle());
  };

  return initHandler;
};

export default useInitNewForm;
