import { useContext } from "react";

import backgroundConfig from "../configs/backgroundConfig";
import styleActionType from "../store/actionType/styleActionType";
import { styleContext } from "../store/context/styleContext";
import { questionActions } from "../store/slice/questionSlice";
import useAppDispatch from "./useAppDispatch";

const useInitNewForm = () => {
  const dispatch = useAppDispatch();
  const { setField } = useContext(styleContext);

  const initHandler = () => {
    dispatch(questionActions.initQuestion());
    setField(styleActionType.THEME, "0");
    setField(styleActionType.FONT, "0");
    setField(styleActionType.BACKGROUND_IMAGE, backgroundConfig.YELLOW1_URL);
  };

  return initHandler;
};

export default useInitNewForm;
