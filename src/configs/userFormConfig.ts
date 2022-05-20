import type { Settings } from "../types/setting";
import type { Style } from "../types/style";
import type { Question } from "../types/question";

interface UserFormConfig {
  initQuestions: Question[];
  initSettings: Settings;
  initStyles: Style;
}

const userFormConfig: UserFormConfig = {
  initQuestions: [],
  initSettings: {
    title: "",
    mode: "",
    startPageImageFile: null,
    startPageParagraph: "",
    endPageImageFile: null,
    endPageParagraph: "",
    pageQuantity: 0,
  },
  initStyles: {
    theme: "",
    font: "",
    backgroundImage: "",
  },
};

export default userFormConfig;
