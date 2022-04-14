import type { Question } from "../store/slice/questionSlice";

export default {
  generateId(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  },
  generateQuestionIndex(id: string, questionList: Question[]) {
    const questionsNeedIndex = questionList.filter(
      (question) => question.type !== "2"
    );
    return questionsNeedIndex.reduce((init, question, i) => {
      if (question.id === id) {
        const newIndex = init + i + 1;
        return newIndex;
      } else return init;
    }, 0);
  },
};
