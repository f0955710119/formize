import { useContext } from "react";
import { styleContext } from "../store/context/styleContext";

const useGetTheme = () => {
  const { theme } = useContext(styleContext);
  return theme;
};

export default useGetTheme;
