import { questionActions } from "../store/slice/questionSlice";
import useAppDispatch from "./useAppDispatch";

const useInitNewForm = () => {
  const dispatch = useAppDispatch();

  const initHandler = () => {
    dispatch(questionActions.initQuestion());
  };

  return initHandler;
};

export default useInitNewForm;
