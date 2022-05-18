import useAppSelector from "./useAppSelector";

const useGetTheme = () => {
  const { theme } = useAppSelector((state) => state.style);
  return theme;
};

export default useGetTheme;
