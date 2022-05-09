import { createContext, FC, ReactNode, useReducer } from "react";

type SetFieldHandler = (fieldKey: string, value: File | string | null) => void;

export interface SettingContext {
  startPageImageFile: File | null;
  startPageImageObjectUrl: string | null;
  endPageImageFile: File | null;
  endPageImageObjectUrl: string | null;
  setField: SetFieldHandler;
}

const initialContextState: SettingContext = {
  startPageImageFile: null,
  startPageImageObjectUrl: "",
  endPageImageFile: null,
  endPageImageObjectUrl: "",
  setField: () => {},
};

export const settingContext = createContext(initialContextState);

interface settingAction {
  type: string;
  payload: File | string | null;
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
