// response 裡有多筆 answers
interface Answer {
  questionId: string;
  input: string | number | Date | Date[] | string[];
}

// data裡會有多筆 responses
interface Response {
  createdTime: Date;
  answsers: Answer[];
}

// survey 抓得時候會抓整包
export interface ResponsesDoc {
  data: Response[];
}
