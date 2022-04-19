import type { Question } from "../types/question";
import styleConfig from "../configs/styleConfig";

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
  generateQuestionIndexArr(questionList: Question[]) {
    let index = 0;
    return questionList.map((question) => {
      if (question.type !== "2") {
        index++;
        return "" + index;
      }
      return "";
    });
  },
  generateUserSurveyQuestionTitle(index: string, title: string) {
    if (index === "") return title;
    return `${index}. ${title}`;
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
  generateDate(isStart: boolean = true) {
    const currentTime = isStart
      ? new Date()
      : new Date(Date.now() + 60 * 60 * 24 * 1000);
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
  generateStyleKeys(includedString: string) {
    return Object.keys(styleConfig)
      .filter((key) => key.includes(includedString))
      .map((key: string) => styleConfig[key]);
  },
  generateResponseThemePalette(themeCode: string) {
    switch (themeCode) {
      case "0": {
        return styleConfig.MAIN;
      }
      case "1": {
        return styleConfig.YELLOW;
      }
      case "2": {
        return styleConfig.GREEN;
      }
      default: {
        throw "沒有找到對應的顏色主題包";
      }
    }
  },
  generateResposneThemeFontFamily(fontCode: string) {
    switch (fontCode) {
      case "0": {
        return styleConfig.OPENHUNNINN;
      }
      case "1": {
        return styleConfig.HANAMINA;
      }
      case "2": {
        return styleConfig.TAIPEISANSTCBOLD;
      }
      default: {
        throw "沒有找到對應的文字主題包";
      }
    }
  },
  generateNewHandledQuestion(questions: Question[]) {
    return questions.map((question) => {
      const hasEditiedNote = question.note !== "新增備註文字，若不需要則留白";
      const hasEditedPlaceholder =
        question.placeholder !== "新增題目填入文字的預設提醒，若不需要則留白";

      if (!hasEditiedNote) {
        question.note = "";
      }
      if (!hasEditedPlaceholder) {
        question.placeholder = "";
      }
      return question;
    });
  },
  generateResponsedUserSurveyFontFamily(fontCode: string) {
    switch (fontCode) {
      case fontCode: {
        return styleConfig[fontCode];
      }
      default: {
        throw "找尋字體錯誤，請檢察帶入的資料";
      }
    }
  },
  generateTextType(type: string) {
    switch (type) {
      case "文字": {
        return "0";
      }
      case "信箱": {
        return "1";
      }
      case "手機": {
        return "2";
      }
      default: {
        return "0";
      }
    }
  },
  generateNewDate(date?: string) {
    if (date) return new Date(date);
    return new Date();
  },
  generateDateInterval(start: Date, end: Date) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.trunc(
      (endDate.getTime() - startDate.getTime()) / 60 / 60 / 24 / 1000
    );
  },
  generateResponsedUnitTime(unit: string) {
    const responsedObj: { [key: string]: number } = {
      "0": 1,
      "1": 60,
      "2": 3600,
    };

    return responsedObj[unit];
  },
};
