interface AnswerColumnConfig {
  [key: string]: string[] | string;
}

const answerColumnConfig: AnswerColumnConfig = {
  "3": "CHOICE_COLUMN_NAME",
  "4": "CHOICE_COLUMN_NAME",
  "5": "MATRIX_COLUMN_NAME",
  "6": "NUMBERIC_COLUMN_NAME",
  "7": "NUMBERIC_COLUMN_NAME",
  "8": "SORT_COLUMN_NAME",
  CHOICE_COLUMN_NAME: ["選項名稱", "次數"],
  MATRIX_COLUMN_NAME: ["欄位名稱", "次數"],
  NUMBERIC_COLUMN_NAME: ["統計項目", "數值"],
  SORT_COLUMN_NAME: ["排序列", "次數"],
};

export default answerColumnConfig;
