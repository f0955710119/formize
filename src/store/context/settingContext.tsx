import { createContext, FC, ReactNode, useReducer } from "react";
import type { SetFieldHandler, SettingContext } from "../../types/setting";

const initialContextState: SettingContext = {
  title: "空白問卷",
  mode: "0",
  pageQuantity: 1,
  startPageImageFile: null,
  startPageImageObjectUrl: "",
  endPageImageFile: null,
  endPageImageObjectUrl: "",
  setField: () => {},
};

export const settingContext = createContext(initialContextState);

interface settingAction {
  type: string;
  payload: File | string | null | number;
}

const reducer = (state: SettingContext, action: settingAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

interface SettingContextProviderProps {
  children: ReactNode;
}

export const SettingContextProvider: FC<SettingContextProviderProps> = ({
  children,
}) => {
  const [settingInfo, dispatch] = useReducer(reducer, initialContextState);
  const setFieldHandler: SetFieldHandler = (fieldKey, value) => {
    dispatch({ type: fieldKey, payload: value });
  };

  const initialValue: SettingContext = {
    title: settingInfo.title,
    mode: settingInfo.mode,
    pageQuantity: settingInfo.pageQuantity,
    startPageImageFile: settingInfo.startPageImageFile,
    startPageImageObjectUrl: settingInfo.startPageImageObjectUrl,
    endPageImageFile: settingInfo.endPageImageFile,
    endPageImageObjectUrl: settingInfo.endPageImageObjectUrl,
    setField: setFieldHandler,
  };

  return (
    <settingContext.Provider value={initialValue}>
      {children}
    </settingContext.Provider>
  );
};
