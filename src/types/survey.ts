export interface Settings {
  status: string;
  mode: string;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
}
export interface Styles {
  theme: string;
  font: string;
  backgroundImages: string[];
}
export interface Surveys {
  id: string;
  title: string;
  url: string;
  createdTime: Date;
  responsedTimes: number;
  openTimes: number;
  settings: Settings;
  styles: Styles;
  questionDocId: string;
  responseDocId: string;
}
