import { Question } from "../types/question";
import type { Settings, Styles } from "../types/survey";

interface UserSurveyConfig {
  initQuestions: Question[];
  initSettings: Settings;
  initStyles: Styles;
}

const userSurveyConfig: UserSurveyConfig = {
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

export default userSurveyConfig;
