interface SettingActionType {
  [key: string]: string;
}

const settingActinoType: SettingActionType = {
  TITLE: "title",
  STATUS: "status",
  MODE: "mode",
  PAGE_QUANTITY: "pageQuantity",
  LIMITED_ANSWER_TIME: "limitedAnswerTime",
  LIMITED_RESPONSE_QUANTITY: "limitedResponseQuantity",
  START_PAGE_IMAGE_FILE: "startPageImageFile",
  START_PAGE_IMAGE_OBJECT_URL: "startPageImageObjectUrl",
  START_PAGE_PARAGRAPH: "startPageParagraph",
  END_PAGE_IMAGE_FILE: "endPageImageFile",
  END_PAGE_PARAGRAPH: "endPageParagraph",
  END_PAGE_IMAGE_OBJECT_URL: "endPageImageObjectUrl",
};

export default settingActinoType;
