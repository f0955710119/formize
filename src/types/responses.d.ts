// response 裡有多筆 answers
export interface QuestionTitle {
  questionName: string;
  questionId: string;
}

export interface Answer {
  questionTitles: QuestionTitle[];
  input: string | number | Date | Date[] | string[] | number[];
}
export interface Response {
  surveyId: string;
  createdTime: Date;
  answers: Answer[];
}
