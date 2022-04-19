import { useAppDispatch } from "./useAppDispatch";
import { styleActions } from "../store/slice/styleSlice";
import styleActionType from "../store/actionType/styleActionType";
import styleConfig from "../configs/styleConfig";

const useStyleHandler = () => {
  const dispatch = useAppDispatch();
  const switchThemeHandler = (title: string) => {
    switch (title) {
      case styleConfig.MAIN_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.MAIN_CODE,
          })
        );
        break;
      }

      case styleConfig.YELLOW_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.YELLOW_CODE,
          })
        );
        break;
      }

      case styleConfig.GREEN_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.GREEN_CODE,
          })
        );
        break;
      }

      case styleConfig.OPENHUNNINN_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.OPENHUNNINN_CODE,
          })
        );
        break;
      }

      case styleConfig.HANAMINA_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.HANAMINA_CODE,
          })
        );
        break;
      }

      case styleConfig.TAIPEISANSTCBOLD_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.TAIPEISANSTCBOLD_CODE,
          })
        );
        break;
      }

      default: {
        throw "沒有這個類型的主題";
      }
    }
  };
  return switchThemeHandler;
};

export default useStyleHandler;
