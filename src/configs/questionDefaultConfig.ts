import { Question } from "../types/question";

interface QuestionDefaultConfig {
  [key: string]: Question;
}

const questionDefaultConfig: QuestionDefaultConfig = {
  ONE_LINE_TEXT_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "新增題目填入文字的預設提醒，若不需要則留白",
    page: 1,
    type: "0",
    validations: {
      required: false,
      length: 50,
      textType: "0",
    },
  },
  MULTIPLE_LINE_TEXT_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "新增題目填入文字的預設提醒，若不需要則留白",
    page: 1,
    type: "1",
    validations: {
      required: false,
      length: 200,
      textType: "0",
    },
  },
  INTRODUCTION_DEFAULT: <Question>{
    id: "",
    title: "新增引言內容",
    note: "",
    placeholder: "",
    page: 1,
    type: "2",
    validations: {
      required: false,
      length: 200,
    },
  },
  ONE_CHOICE_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "3",
    options: ["選項1", "選項2", "選項3"],
    validations: {
      required: false,
      maxSelected: 1,
    },
  },
  MULTIPLE_CHOICE_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "4",
    options: ["選項1", "選項2", "選項3"],
    validations: {
      required: false,
      maxSelected: 3,
    },
  },
  MARTIX_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "5",
    options: ["選項1"],
    martixs: ["欄位1", "欄位2", "欄位3"],
    validations: {
      required: false,
      maxSelected: 3,
    },
  },
  NUMBER_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "新增題目填入文字的預設提醒，若不需要則留白",
    page: 1,
    type: "6",
    validations: {
      required: false,
      max: 100,
      min: 1,
      decimal: 0,
      unit: "",
      interval: 1,
    },
  },
  SLIDER_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "7",
    validations: {
      required: false,
      min: 1,
      max: 100,
      decimal: 0,
      unit: "",
      interval: 1,
    },
  },
  SORT_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "8",
    options: ["選項1", "選項2", "選項3"],
    validations: {
      required: false,
      maxSelected: 3,
    },
  },
  DATE_DEFAULT: <Question>{
    id: "",
    title: "新增題目標題",
    note: "新增備註文字，若不需要則留白",
    placeholder: "",
    page: 1,
    type: "9",
    validations: {
      required: false,
      multipleDate: false,
      hasRange: false,
      startDate: null,
      endDate: null,
    },
  },
};

export default questionDefaultConfig;
