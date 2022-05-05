import { Settings } from "./form";

export interface UserForm {
  responseDocId: string;
  questions: Question[];
  settings: Settings;
  styles: Styles;
}
