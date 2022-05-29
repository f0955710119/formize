import { FC, ChangeEventHandler, useState } from "react";

import TextField from "@mui/material/TextField";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import useResetInputValue from "../../../hooks/useResetInputValue";
import { userActions } from "../../../store/slice/userSlice";

const CustomedTextField = styled(TextField)`
  width: 100%;

  & div,
  & input {
    font-size: 2rem;
    width: 100%;
  }
`;

interface OneLineTextProps {
  textType: string;
  questionId: string;
  length?: number;
  min?: number;
  max?: number;
  unit?: string;
}

const OneLineText: FC<OneLineTextProps> = ({
  textType,
  questionId,
  length,
  max,
  min,
}: OneLineTextProps) => {
  const dispatch = useAppDispatch();

  const { answers } = useAppSelector((state) => state.user);
  const checkValidTimerHandler = useCheckValidTimer();
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const resetInputHandler = useResetInputValue();

  const [inputDispaly, setInputDisplay] = useState<string>(() => {
    if (!answers[questionIdIndex]) return "";
    const { input } = answers[questionIdIndex];
    if (input === null) return "";
    return input;
  });

  const textChangeHandler = (value: string) => {
    showInvalidHandler("");
    setInputDisplay(value);
    checkValidTimerHandler(() => {
      const hasLengthInvalid = length && value.length > length;

      if (value === "") {
        resetInputHandler(questionIdIndex);
        return;
      }

      dispatch(userActions.updateFormAnswer({ questionIdIndex, input: value }));

      if (hasLengthInvalid) {
        showInvalidHandler(`字數不能超過${length}字`);
        return;
      }
    }, 300);
  };

  const numberChangeHandler = (value: string) => {
    showInvalidHandler("");
    setInputDisplay(value);
    checkValidTimerHandler(() => {
      const numberReg = /^[\d]*$/;
      const hasMaxInvalid = max !== undefined && +value > max;
      const hasMinInvalid = min !== undefined && +value < min;
      const hasTextTypeInvalid = !numberReg.test(value);

      if (value === "") {
        resetInputHandler(questionIdIndex);
        return;
      }

      dispatch(userActions.updateFormAnswer({ questionIdIndex, input: value }));

      if (hasMaxInvalid) {
        showInvalidHandler(`數值不能大於${max}`);
        return;
      }

      if (hasMinInvalid) {
        showInvalidHandler(`數值不能小於${min}`);
        return;
      }

      if (hasTextTypeInvalid) {
        showInvalidHandler(`只能輸入整數！`);
        return;
      }
    }, 300);
  };

  const changeHandler = textType === "text" ? textChangeHandler : numberChangeHandler;
  return (
    <CustomedTextField
      value={inputDispaly}
      variant="standard"
      type="text"
      autoComplete="off"
      onChange={(event) => changeHandler(event.target.value)}
    />
  );
};

export default OneLineText;
