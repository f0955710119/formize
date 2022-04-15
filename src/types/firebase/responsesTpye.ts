// response 裡有多筆 answers
export interface Answer {
  questionId: string;
  input: string | number | Date | Date[] | string[] | number[];
}
export interface Response {
  surveyId: string;
  createdTime: Date;
  answers: Answer[];
}
