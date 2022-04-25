import { useAppSelector } from "./useAppSelector";

const useGetQuestionIdIndex = (questionId: string) => {
  const { questionIdKeys } = useAppSelector((state) => state.user);
  const index = +questionIdKeys[questionId];
  return index;
};

export default useGetQuestionIdIndex;
