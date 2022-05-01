export interface Answer {
  type: string;
  id: string;
  input: string;
}

export interface Table {
  title: string;
  id: string;
  type: string;
  martixs?: string[];
  options?: string[];
}

export interface Responses {
  [key: string]: string | Date[] | Answer[] | Table[] | never[] | Date;
}
