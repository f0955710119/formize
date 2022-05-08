import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../types/question";
import helper from "../../utils/helper";
import { UserState } from "../slice/userSlice";

const setUpQuestionInitList: CaseReducer<
  UserState,
  PayloadAction<Question[]>
> = (state, action) => {
  const questionObject = helper.generateQuestionsKeysForResponses(
    action.payload
  );
  const questionKeysConfig = questionObject[0];
  const keysArr = Object.keys(questionKeysConfig);
  const initAnswers = keysArr.map((key) => {
    return {
      questionId: key,
      input: null,
      type: `${questionObject[1][key]}`,
    };
  });

  state.questionIdKeys = questionKeysConfig;
  state.errorMessages = Array(action.payload.length).fill("");
  state.answers = initAnswers;
  action.payload.forEach((question, i) => {
    state.errorMessagesIdKeys[question.id] = i;
  });
};

const updateFormAnswer: CaseReducer<
  UserState,
  PayloadAction<{ questionIdIndex: number; input: string | null }>
> = (state, action) => {
  const answerIndex = action.payload.questionIdIndex;
  if (!state.answers[answerIndex]) return;
  state.answers[answerIndex].input = action.payload.input;
};

const setErrorMessageOfInvalidAnswer: CaseReducer<
  UserState,
  PayloadAction<{ questionIdIndex: number; errorMessage: string }>
> = (state, action) => {
  const errorIndex = action.payload.questionIdIndex;
  if (state.errorMessages.length === 0) return;
  state.errorMessages[errorIndex] = action.payload.errorMessage;
};

export default {
  setUpQuestionInitList,
  updateFormAnswer,
  setErrorMessageOfInvalidAnswer,
};
