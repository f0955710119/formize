import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../types/question";
import helper from "../../utils/helper";
import { UserState } from "../slice/userSlice";

const setUpQuestionIdKeys: CaseReducer<UserState, PayloadAction<Question[]>> = (
  state,
  action
) => {
  const questionObject = helper.generateQuestionsKeysForResponses(
    action.payload
  );
  state.questionIdKeys = questionObject[0];
};

const setUpQuestionInitList: CaseReducer<
  UserState,
  PayloadAction<Question[]>
> = (state, action) => {
  const questionObject = helper.generateQuestionsKeysForResponses(
    action.payload
  );
  const keysArr = Object.keys(questionObject[0]);
  const initAnswers = keysArr.map((key) => {
    return {
      questionId: key,
      input: "",
      type: questionObject[1][key],
    };
  });

  state.answers = initAnswers;
};

const updateFormAnswer: CaseReducer<
  UserState,
  PayloadAction<{ questionIdIndex: number; input: string }>
> = (state, action) => {
  const answerIndex = action.payload.questionIdIndex;
  state.answers[answerIndex].input = action.payload.input;
};

export default {
  setUpQuestionIdKeys,
  setUpQuestionInitList,
  updateFormAnswer,
};
