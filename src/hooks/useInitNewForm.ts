import { questionActions } from "../store/slice/questionSlice";
import { settingActions } from "../store/slice/settingSlice";
import { styleActions } from "../store/slice/styleSlice";
import { useAppDispatch } from "./useAppDispatch";

const useInitNewForm = () => {
  const dispatch = useAppDispatch();

  const initHandler = () => {
    dispatch(settingActions.initSetting());
    dispatch(questionActions.initQuestion());
    dispatch(styleActions.initStyle());
  };

  return initHandler;
};

export default useInitNewForm;
