import type { Settings, Styles } from "../types/form";
import { Question } from "../types/question";

interface UserFormConfig {
  initQuestions: Question[];
  initSettings: Settings;
  initStyles: Styles;
}

const userFormConfig: UserFormConfig = {
  initQuestions: [],
  initSettings: {
    title: "",
    status: "",
    mode: "",
    limitedAnswerTime: null,
    limitedResponseQuantity: null,
    startPageImageFile: null,
    startPageParagraph: "",
    endPageImageFile: null,
    endPageParagraph: "",
    pageQuantity: 0,
  },
  initStyles: {
    theme: "",
    font: "",
    backgroundImages: [""],
  },
};

export default userFormConfig;
