import { Settings } from "./form";
import { Question } from "./question";

export interface UserForm {
  responseDocId: string;
  questions: Question[];
  settings: Settings;
  styles: Styles;
}
