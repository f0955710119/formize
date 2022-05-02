interface QuestionConfig {
  [key: string]: string;
}

const questionConfig: QuestionConfig = {
  ONE_LINE_TEXT: "0",
  MULTIPLE_LINE_TEXT: "1",
  INTRODUCTION: "2",
  ONE_CHOICE: "3",
  MULTIPLE_CHOICE: "4",
  MATRIX: "5",
  NUMBER: "6",
  SLIDER: "7",
  SORT: "8",
  DATE: "9",
  REQUIRED: "required",
  LENGTH: "length",
  MAX_SELECTED: "maxSelected",
  MIN: "min",
  MAX: "max",
  UNIT: "unit",
  INTERVAL: "interval",
  DECIMAL: "decimal",
  START_DATE: "startDate",
  END_DATE: "endDate",
};
export default questionConfig;
