import sweetAlert from "../utils/sweetAlert";
import useAppSelector from "./useAppSelector";
import useGetQuestionTitleIndex from "./useGetQuestionTitleIndex";

const useCheckQuestionArraySameString = () => {
  const { editingQuestionId, questions } = useAppSelector(
    (state) => state.question
  );
  const getTitleIndexHandler = useGetQuestionTitleIndex();

  const checkHasNoSameArrayStringNameHandler = () => {
    if (editingQuestionId === null) return true;
    let questionTitleIndex = getTitleIndexHandler(editingQuestionId);
    const haseditingQuestion = questions.find(
      (question) => question.id === editingQuestionId
    );

    if (!haseditingQuestion) {
      sweetAlert.errorReminderAlert("發生技術問題，請聯絡IT部門");
      return false;
    }
    const questionType = haseditingQuestion.type;
    if (
      questionType === "3" ||
      questionType === "4" ||
      questionType === "5" ||
      questionType === "8"
    ) {
      const options = haseditingQuestion.options
        ? haseditingQuestion.options
        : [""];
      const optionsUnique = [...new Set(options)];
      if (options.length !== optionsUnique.length) {
        sweetAlert.errorReminderAlert(
          `「${questionTitleIndex}.${haseditingQuestion.title}」有誤，\n不可以有重複的選項名稱，\n請先修正再更換編輯的題目！`,
          3500
        );
        return false;
      }
    }

    if (questionType === "5") {
      const matrixs = haseditingQuestion.matrixs
        ? haseditingQuestion.matrixs
        : [""];
      const matrixsUnique = [...new Set(matrixs)];
      if (matrixs.length !== matrixsUnique.length) {
        sweetAlert.errorReminderAlert(
          `「${questionTitleIndex}.${haseditingQuestion.title}」有誤，\n不可以有重複的欄位名稱，\n請先修正再更換編輯的題目！`,
          3500
        );
        return false;
      }
    }
    return true;
  };

  return checkHasNoSameArrayStringNameHandler;
};

export default useCheckQuestionArraySameString;
