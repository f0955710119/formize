import { useRef } from "react";

const useGetStatisTitleIndex = () => {
  const titleIndex = useRef<number>(0);
  const currentQuestionId = useRef<string>("default");

  const getUpdatedTitleIndexHandler = (updateId: string) => {
    if (!updateId.includes(currentQuestionId.current)) {
      currentQuestionId.current = updateId;
      titleIndex.current++;
    }
    return titleIndex.current;
  };

  return getUpdatedTitleIndexHandler;
};

export default useGetStatisTitleIndex;
