import type { Question } from "./question";
import type { Settings } from "./setting";

export interface UserAnswer {
  questionId: string;
  input: string | null;
  type: string;
}

export type UserAnswerErrorMessage = string;

export interface UserForm {
  responseDocId: string;
  questions: Question[];
  settings: Settings;
  style: Style;
}
