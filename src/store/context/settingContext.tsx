import { createContext, FC, ReactNode, useReducer } from "react";
import type { SetFieldHandler, SettingContext } from "../../types/setting";

const initialContextState: SettingContext = {
  title: "",
  mode: "0",
  pageQuantity: 1,
  startPageParagraph: "",
  startPageImageFile: null,
  startPageImageObjectUrl: "",
  endPageParagraph: "",
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

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
  const [settingInfo, dispatch] = useReducer(reducer, initialContextState);
  const setFieldHandler: SetFieldHandler = (fieldKey, value) => {
    dispatch({ type: fieldKey, payload: value });
  };

  const {
    title,
    mode,
    pageQuantity,
    startPageParagraph,
    startPageImageFile,
    startPageImageObjectUrl,
    endPageParagraph,
    endPageImageFile,
    endPageImageObjectUrl,
  } = settingInfo;

  const initialValue: SettingContext = {
    title,
    mode,
    pageQuantity,
    startPageParagraph,
    startPageImageFile,
    startPageImageObjectUrl,
    endPageParagraph,
    endPageImageFile,
    endPageImageObjectUrl,
    setField: setFieldHandler,
  };

  return <settingContext.Provider value={initialValue}>{children}</settingContext.Provider>;
};
