import helper from "../utils/helper";
import { useAppSelector } from "./useAppSelector";

const useGetQuestionTitleIndex = () => {
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const { mode, pageQuantity } = useAppSelector((state) => state.setting);

  const getTitleIndexHandler = (id: string) => {
    let questionTitleIndex = "";

    if (mode === "0") {
      questions.forEach((question, i) => {
        if (question.id !== id) return;
        questionTitleIndex = helper.generateQuestionIndexArr(questions)[i];
      });
    }

    if (mode === "1") {
      questions
        .filter((question) => question.page === editingFormPage)
        .forEach((question, i) => {
          if (question.id !== id) return;
          questionTitleIndex = helper.generateQuestionMultiPageIndexArr(
            pageQuantity,
            questions
          )[editingFormPage - 1][i];
        });
    }

    return questionTitleIndex;
  };

  return getTitleIndexHandler;
};

export default useGetQuestionTitleIndex;
