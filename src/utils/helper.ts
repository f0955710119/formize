import type { Question } from "../types/question";
import styleConfig from "../configs/styleConfig";
import { Table } from "../types/responses";

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
  generateQuestionMultiPageIndexArr(
    pageQuantity: number,
    questionList: Question[]
  ) {
    const countNumberOfQuestionPage = Array(pageQuantity).fill(0);
    questionList.forEach((question) => {
      countNumberOfQuestionPage[question.page - 1] =
        countNumberOfQuestionPage[question.page - 1] + 1;
    });

    const indexArr = this.generateQuestionIndexArr(questionList);
    const interval = [0];
    countNumberOfQuestionPage.forEach((number, i) =>
      interval.push(number + interval[i])
    );

    const indexInDifferentPageArr = countNumberOfQuestionPage.map((_, i) =>
      indexArr.slice(interval[i], interval[i + 1])
    );
    return indexInDifferentPageArr;
  },
  generateUserFormQuestionTitle(index: string, title: string) {
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
  generateResponsedUserFormFontFamily(fontCode: string) {
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
  generateDateFormatString(incomingDate: Date) {
    const year = incomingDate.getFullYear();
    const month = `${incomingDate.getMonth() + 1}`.padStart(2, "0");
    const date = `${incomingDate.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${date}`;
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
  generateChineseNumberString(number: number) {
    const chineseNumberList = [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
    ];
    return chineseNumberList[number];
  },
  generateResponsedQuestionTypeName(type: string) {
    const responsedObj: { [key: string]: string } = {
      "0": "單行文字",
      "1": "多行文字",
      "2": "引言",
      "3": "單選題",
      "4": "多選題",
      "5": "矩陣題",
      "6": "數值題",
      "7": "滑桿題",
      "8": "排序題",
      "9": "日期題",
    };

    return responsedObj[type];
  },
  generateResponsedQuestionDefault(type: string) {
    const responsedObj: { [key: string]: string } = {
      "0": "ONE_LINE_TEXT_DEFAULT",
      "1": "MULTIPLE_LINE_TEXT_DEFAULT",
      "2": "INTRODUCTION_DEFAULT",
      "3": "ONE_CHOICE_DEFAULT",
      "4": "MULTIPLE_CHOICE_DEFAULT",
      "5": "MARTIX_DEFAULT",
      "6": "NUMBER_DEFAULT",
      "7": "SLIDER_DEFAULT",
      "8": "SORT_DEFAULT",
      "9": "DATE_DEFAULT",
    };

    return responsedObj[type];
  },
  generateDifferentPageQuestionsArr(
    pageQuantity: number,
    questions: Question[]
  ) {
    const differentQuestionsArr = Array(pageQuantity)
      .fill(null)
      .map(() => []);

    questions.forEach((question) => {
      (differentQuestionsArr[question.page - 1] as Question[]).push(question);
    });

    return differentQuestionsArr;
  },
  generateQuestionsKeysForResponses(questions: Question[]) {
    const questionKeysConfig: { [key: string]: string } = {};
    const questionKeysType: { [key: string]: string } = {};

    let keyIndex = 0;
    questions.forEach((question) => {
      if (question.type === "2") return;
      if (
        question.type !== "5" &&
        question.type !== "8" &&
        question.type !== "9"
      ) {
        questionKeysConfig[question.id] = `${keyIndex}`;
        questionKeysType[question.id] = question.type;
        keyIndex++;
        return;
      }
      if (question.type === "9" && question.validations.multipleDate) {
        Array(2)
          .fill(null)
          .forEach((_, indexTime) => {
            const dateId =
              indexTime === 0 ? `${question.id}_start` : `${question.id}_end`;
            questionKeysConfig[dateId] = `${keyIndex}`;
            questionKeysType[dateId] = question.type;
            keyIndex++;
          });
        return;
      }

      Array(question?.options?.length)
        .fill(null)
        .forEach((_, indexOption) => {
          const optionId = `${question.id}_${indexOption}`;
          questionKeysConfig[optionId] = `${keyIndex}`;
          questionKeysType[optionId] = question.type;
          keyIndex++;
        });
    });

    return [questionKeysConfig, questionKeysType];
  },

  generateResponseTableInfoArr(questions: Question[]) {
    const questionsObject = this.generateQuestionsKeysForResponses(questions);
    const ids = Object.keys(questionsObject[1]);
    const types = Object.values(questionsObject[1]);
    const hasOptions: { [key: string]: string[] } = {};
    const hasMartixs: { [key: string]: string[] } = {};
    const titles: { [key: string]: string } = {};

    questions.forEach((question) => {
      titles[question.id] = question.title;
      if (question.type === "5" && question.options && question.martixs) {
        hasOptions[question.id] = question.options;
        hasMartixs[question.id] = question.martixs;
        return;
      }

      if (
        question.type === "8" ||
        question.type === "3" ||
        question.type === "4"
      ) {
        if (!question.options) return;
        hasOptions[question.id] = question.options;
      }
    });

    const tables = ids.map((id, i) => {
      const originalId = id.includes("_") ? id.split("_")[0] : id;
      const originTitle = titles[originalId];
      if (id.includes("_start") || id.includes("_end")) {
        const titleNote = id.includes("_start") ? "起始日" : "結束日";
        return {
          title: `${originTitle} (${titleNote})`,
          id,
          type: types[i],
        };
      }

      if (types[i] === "5") {
        const options = hasOptions[originalId];
        const martixs = hasMartixs[originalId];
        const optionIndex: number = +id.split("_")[1];
        return {
          title: `${originTitle} - ${options[optionIndex]}`,
          id,
          type: types[i],
          martixs,
        };
      }

      if (types[i] === "8") {
        const options = hasOptions[originalId];
        const optionIndex = +id.split("_")[1];
        return {
          title: `${originTitle} - ${options[optionIndex]}`,
          id,
          type: types[i],
          options,
        };
      }

      if (types[i] === "3" || types[i] === "4") {
        const options = hasOptions[originalId];
        return {
          title: `${originTitle}`,
          id,
          type: types[i],
          options,
        };
      }

      return {
        title: `${originTitle}`,
        id,
        type: types[i],
      };
    });

    return tables;
  },
  generateheaderName(type: string) {
    const typeObj: { [key: string]: string[] } = {
      "3": ["選項名稱", "次數"],
      "4": ["選項名稱", "次數"],
      "5": ["欄位名稱", "次數"],
      "6": ["統計項目", "數值"],
      "7": ["統計項目", "數值"],
      "8": ["排序列", "次數"],
    };
    return typeObj[type];
  },
  convertFirebaseTimeToDate(timeObj: Date) {
    const timeValueArr = Object.values(timeObj);
    return new Date(timeValueArr[0] * 1000 + timeValueArr[1] / 1000000);
  },
  convertDateToLocaleString(time: Date) {
    return time.toLocaleString("zh-tw", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};
