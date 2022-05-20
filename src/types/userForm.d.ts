import type { Settings } from "./setting";
import type { Question } from "./question";

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
  styles: Styles;
}
