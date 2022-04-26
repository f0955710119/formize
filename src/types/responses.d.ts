export interface Answer {
  type: string;
  id: string;
  input: string | number;
}

export interface Table {
  title: string;
  id: string;
  type: string;
  martixs?: string[];
  options?: string[];
}

export interface Responses {
  surveyId: string;
  createdDate: Date[] | never[];
  answers: Answer[] | never[];
  tableInfo: Table[];
}
