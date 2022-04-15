export interface Settings {
  status: number;
  mode: number;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
}
export interface Styles {
  theme: number;
  fontTraditional: number;
  fontEnglish: number;
  backgroundImages: string[];
}
export interface Surveys {
  id: string;
  title: string;
  url: string;
  // questionTitleIds: string[]; > 自己去產生8碼亂數
  createdTime: Date;
  responsedTimes: number;
  openTimes: number;
  settings: Settings;
  styles: Styles;
  questionDocId: string;
  responseDocId: string;
}

export interface SurveyInput {
  title: string;
  url: string;
  settings: Settings;
  styles: Styles;
  questionDocId: string;
  responseDocId: string;
}
