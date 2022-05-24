import { createContext, FC, ReactNode, useReducer } from "react";

import backgroundConfig from "../../configs/backgroundConfig";
import type { SetFieldHandler, StyleContext } from "../../types/style";

const initialContextState: StyleContext = {
  theme: "0",
  font: "0",
  backgroundImage: backgroundConfig.YELLOW1_URL,
  setField: (field, value) => {},
};

export const styleContext = createContext(initialContextState);

interface settingAction {
  type: string;
  payload: string | string[];
}

const reducer = (state: StyleContext, action: settingAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

interface StyleContextProviderProps {
  children: ReactNode;
}

export const StyleContextProvider: FC<StyleContextProviderProps> = ({
  children,
}) => {
  const [styleInfo, dispatch] = useReducer(reducer, initialContextState);
  const setField: SetFieldHandler = (fieldKey, value) => {
    dispatch({ type: fieldKey, payload: value });
  };

  const { theme, font, backgroundImage } = styleInfo;

  const initialValue: StyleContext = {
    theme,
    font,
    backgroundImage,
    setField,
  };

  return (
    <styleContext.Provider value={initialValue}>
      {children}
    </styleContext.Provider>
  );
};
