import answerColumnConfig from "../configs/answerColumnConfig";
import questionDefaultConfig from "../configs/questionDefaultConfig";
import styleConfig from "../configs/styleConfig";
import type { Question } from "../types/question";
interface CheckStringName {
  stringArr: string[];
  index: number;
  editingText: string;
}

const filterNotIntroductionQuestions = (questions: Question[]) =>
  questions.filter((question) => question.type !== "2");

const countSpecificQuestionIndex = (
  questions: Question[],
  curerntQuestionId: string
) =>
  questions.reduce((init, question, i) => {
    if (question.id === curerntQuestionId) {
      const newIndex = i + 1;
      return newIndex;
    } else return init;
  }, 0);

const initQuestionQuantityOfDifferentPages = (pageQuantity: number) =>
  Array(pageQuantity).fill(0);

const updateCountNumbersOfQuestionPage = (
  questions: Question[],
  questionQuantityOfDifferentPages: number[]
) => {
  questions.forEach((question) => {
    questionQuantityOfDifferentPages[question.page - 1] =
      questionQuantityOfDifferentPages[question.page - 1] + 1;
  });
};

const createQuestionsIntervalPointsForDifferentPages = (
  questionQuantityOfDifferentPages: number[]
) => {
  const intervalPoints = [0];
  questionQuantityOfDifferentPages.forEach((number, i) =>
    intervalPoints.push(number + intervalPoints[i])
  );
  return intervalPoints;
};

const createIndexsForQuestionsInDiffernetPages = (
  questionQuantityOfDifferentPages: number[],
  indexsForOnePageMode: string[],
  intervalPoints: number[]
) =>
  questionQuantityOfDifferentPages.map((_, i) =>
    indexsForOnePageMode.slice(intervalPoints[i], intervalPoints[i + 1])
  );

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
  generateQuestionIndex(questionId: string, questions: Question[]) {
    const notIntroductionQuestions = filterNotIntroductionQuestions(questions);
    return countSpecificQuestionIndex(notIntroductionQuestions, questionId);
  },
  generateQuestionIndexArr(questions: Question[]) {
    let index = 0;
    return questions.map((question) => {
      if (question.type === "2") return "";
      index++;
      return "" + index;
    });
  },
  generateQuestionMultiPageIndexArr(
    pageQuantity: number,
    questions: Question[]
  ) {
    const questionQuantityOfDifferentPages =
      initQuestionQuantityOfDifferentPages(pageQuantity);
    updateCountNumbersOfQuestionPage(
      questions,
      questionQuantityOfDifferentPages
    );

    const indexsForOnePageMode = this.generateQuestionIndexArr(questions);
    const intervalPoints = createQuestionsIntervalPointsForDifferentPages(
      questionQuantityOfDifferentPages
    );
    return createIndexsForQuestionsInDiffernetPages(
      questionQuantityOfDifferentPages,
      indexsForOnePageMode,
      intervalPoints
    );
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
  generateConfigKeys(
    includedString: string,
    config: { [key: string]: string }
  ) {
    return Object.keys(config)
      .filter((key) => key.includes(includedString))
      .map((key: string) => config[key]);
  },
  generateEnumConfig(keys: string[]) {
    return keys.reduce(
      (newConfig: { [key: string]: string }, objectKey: string, i: number) => {
        newConfig[i] = objectKey;
        return newConfig;
      },
      {}
    );
  },
  generateResponseThemePalette(themeCode: string) {
    const themeCodeValueKeys = this.generateConfigKeys(
      "_CODE_VALUE",
      styleConfig
    );
    const themeCofing = this.generateEnumConfig(themeCodeValueKeys);
    return themeCofing[themeCode];
  },
  generateResposneThemeFontFamily(fontCode: string) {
    const fontCodeValueKeys = this.generateConfigKeys("_CSS", styleConfig);
    const fontConfig = this.generateEnumConfig(fontCodeValueKeys);
    return fontConfig[fontCode];
  },
  generateNewDateObj(date?: string | number) {
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
    const oneDayMilliseconds = 60 * 60 * 24 * 1000;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.round(
      (endDate.getTime() - startDate.getTime()) / oneDayMilliseconds
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
  generateResponsedQuestionDefault(type: string) {
    const defaultQuestionKeys = Object.keys(questionDefaultConfig);
    const defaultQuestionConfig = this.generateEnumConfig(defaultQuestionKeys);
    return defaultQuestionConfig[type];
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
  generateColumnName(type: string) {
    const responsedHeaderKey = "" + answerColumnConfig[type];
    return [...answerColumnConfig[responsedHeaderKey]];
  },
};
