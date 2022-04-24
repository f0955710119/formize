import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../types/question";
import { UserState } from "../slice/userSlice";

const setUpQuestionIdKeys: CaseReducer<UserState, PayloadAction<Question[]>> = (
  state,
  action
) => {
  const keyObject: { [key: string]: string } = {};
  action.payload.forEach((question, i) => {
    keyObject[question.id] = `${i}`;
  });
  state.questionIdKeys = keyObject;
};

const setUpQuestionInitList: CaseReducer<
  UserState,
  PayloadAction<Question[]>
> = (state, action) => {
  state.answers = action.payload.map((question) => {
    return {
      questionId: question.id,
      input: "",
    };
  });
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
