import type { Question } from "../store/slice/questionSlice";
import { StyledComponentTheme } from "../store/theme/theme";
import questionConfig from "./questionConfig";

interface CheckStringName {
  stringArr: string[];
  index: number;
  editingText: string;
}

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
        const newIndex = i + 1;
        return newIndex;
      } else return init;
    }, 0);
  },
  checkExistedName(nameObj: CheckStringName) {
    return nameObj.stringArr
      .map((oldString, i) => {
        if (i === nameObj.index) return null;
        return oldString === nameObj.editingText;
      })
      .find((hasDuplicateOptionText) => hasDuplicateOptionText === true);
  },
  generateUpdateNames({ stringArr, index, editingText }: CheckStringName) {
    return stringArr.map((prevOption, i) => {
      if (i !== index) return prevOption;
      return editingText;
    });
  },
  generateDate() {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    const newTime = `${year}-${("" + month).padStart(2, "0")}-${(
      "" + date
    ).padStart(2, "0")}`;
    return newTime;
  },
  generateParseNumberTime(value: string, isStart: boolean = true) {
    const timer = isStart ? "000000" : "235959";
    return Number.parseInt(value.replaceAll("-", "") + timer);
  },
};
