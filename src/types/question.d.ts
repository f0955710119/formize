import { Validation } from "./validation";

export interface Question {
  id: string;
  page: number;
  title: string;
  note: string;
  placeholder?: string;
  type: string;
  options?: string[];
  martixs?: string[];
  validations: Validation;
  image?: string | File | null;
}

export interface Questions {
  questions: Question[];
}
