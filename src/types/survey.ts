export interface Settings {
  title: string;
  status: string;
  mode: string;
  limitedAnswerTime: number | null;
  limitedResponseQuantity: number | null;
  startPageImageFile: string | null;
  startPageParagraph: string;
  endPageImageFile: string | null;
  endPageParagraph: string;
}
export interface Styles {
  theme: string;
  font: string;
  backgroundImages: string[];
}
export interface Surveys {
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
