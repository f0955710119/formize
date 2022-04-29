import { Question } from "../types/question";
import type { Settings, Styles } from "../types/form";

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
  },
  initStyles: {
    theme: "",
    font: "",
    backgroundImages: [""],
  },
};

export default userFormConfig;
