import { useContext } from "react";
import { settingContext } from "../store/context/settingContext";
import { Question } from "../types/question";
import helper from "../utils/helper";
import useAppSelector from "./useAppSelector";

const getQuestionTitleIndexOfSinglePageMode = (
  questions: Question[],
  currentQuestionId: string
) => {
  let questionTitleIndex = "";

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id !== currentQuestionId) return;
    questionTitleIndex = helper.generateQuestionIndexArr(questions)[i];
    break;
  }
  return questionTitleIndex;
};

const getQuestionTitleIndexOfMultiplePageMode = (
  questionInfo: {
    questions: Question[];
    editingFormPage: number;
    pageQuantity: number;
  },
  currentQuestionId: string
) => {
  let questionTitleIndex = "";
  const { questions, editingFormPage, pageQuantity } = questionInfo;
  const filteredQuestions = questions.filter(
    (question) => question.page === editingFormPage
  );
  for (let i = 0; i < filteredQuestions.length; i++) {
    if (questions[i].id !== currentQuestionId) return;
    questionTitleIndex = helper.generateQuestionMultiPageIndexArr(
      pageQuantity,
      questions
    )[editingFormPage - 1][i];
    break;
  }

  return questionTitleIndex;
};

const useGetQuestionTitleIndex = () => {
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const { mode, pageQuantity } = useContext(settingContext);

  const getTitleIndexHandler = (id: string) => {
    const modeConfig: { [key: string]: string | undefined } = {
      "0": getQuestionTitleIndexOfSinglePageMode(questions, id),
      "1": getQuestionTitleIndexOfMultiplePageMode(
        { questions, editingFormPage, pageQuantity },
        id
      ),
    };
    return modeConfig[mode];
  };

  return getTitleIndexHandler;
};

export default useGetQuestionTitleIndex;
