import { useContext } from "react";
import backgroundConfig from "../configs/backgroundConfig";
import styleConfig from "../configs/styleConfig";
import styleActionType from "../store/actionType/styleActionType";
import { styleContext } from "../store/context/styleContext";
import helper from "../utils/helper";

const allStyles = [
  ...helper.generateConfigKeys("_NUM", styleConfig),
  ...helper.generateConfigKeys("_URL", backgroundConfig),
];

const createConfigWithCustomKey = (arr: string[]) =>
  arr.reduce((config: { [key: string]: string }, item: string, i: number) => {
    config[item] = allStyles[i];
    return config;
  }, {});

const themeKeys = helper.generateConfigKeys("_NAME", styleConfig);
const fontKeys = helper.generateConfigKeys("_FONT", styleConfig);
const bakcgroundImageKey = helper.generateConfigKeys("_BG", backgroundConfig);
const allStyleNameKeys = [...themeKeys, ...fontKeys, ...bakcgroundImageKey];

const styleConfigForSwitchNewInput =
  createConfigWithCustomKey(allStyleNameKeys);

const useStyleHandler = () => {
  const { setField } = useContext(styleContext);

  const switchThemeHandler = (title: string, styleType: string) => {
    const newStyleForUpdate = styleConfigForSwitchNewInput[title];

    if (styleType === "theme") {
      setField(styleActionType.THEME, newStyleForUpdate);
      return;
    }
    if (styleType === "font") {
      setField(styleActionType.FONT, newStyleForUpdate);
      return;
    }
    setField(styleActionType.BACKGROUND_IMAGE, newStyleForUpdate);
  };
  return switchThemeHandler;
};

export default useStyleHandler;
