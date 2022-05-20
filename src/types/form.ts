import type { Settings } from "./setting";
import type { Style } from "./style";
export interface Forms {
  id: string;
  title: string;
  url: string;
  createdTime: Date;
  latestResponsedTime: Date | null;
  responsedTimes: number;
  openTimes: number;
  settings: Settings;
  styles: Style;
  questionDocId: string;
  responseDocId: string;
  groupId: string;
}
