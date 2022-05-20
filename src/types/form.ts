import type { Settings } from "./setting";
import type { Styles } from "./style";
export interface Forms {
  id: string;
  title: string;
  url: string;
  createdTime: Date;
  latestResponsedTime: Date | null;
  responsedTimes: number;
  openTimes: number;
  settings: Settings;
  styles: Styles;
  questionDocId: string;
  responseDocId: string;
  groupId: string;
}
