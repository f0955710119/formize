import { Validation } from "./validation";

export interface Question {
  id: string;
  page: number;
  title: string;
  note: string;
  type: string;
  options?: string[];
  matrixs?: string[];
  validations: Validation;
  image?: string | File | null;
}

export interface Questions {
  questions: Question[];
}

export type UpdateValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | Validation
  | undefined;
