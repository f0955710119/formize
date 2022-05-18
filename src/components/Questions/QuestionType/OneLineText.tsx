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
  decimal?: number;
}

const OneLineText: FC<OneLineTextProps> = ({
  textType,
  questionId,
  length,
  max,
  min,
  decimal,
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

  const textChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputDisplay(event.target.value);
    checkValidTimerHandler(() => {
      const input = event.target.value;
      const hasLengthInvalid = length && input.length > length;

      if (input === "") {
        resetInputHandler(questionIdIndex);
        return;
      }

      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));

      if (hasLengthInvalid) {
        showInvalidHandler(`字數不能超過${length}字`);
        return;
      }
      showInvalidHandler("");
    }, 300);
  };

  const numberChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputDisplay(event.target.value);
    checkValidTimerHandler(() => {
      const input = event.target.value;
      const hasMaxInvalid = max && +input > max;
      const hasMinInvalid = min && +input < min;
      const hasDecimalInvalid =
        typeof decimal === "number" &&
        input.includes(".") &&
        input.split(".")[1].length > decimal;

      if (input === "") {
        resetInputHandler(questionIdIndex);
        return;
      }

      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));

      if (hasMaxInvalid) {
        showInvalidHandler(`數值不能大於${max}`);
        return;
      }

      if (hasMinInvalid) {
        showInvalidHandler(`數值不能小於${min}`);
        return;
      }

      if (hasDecimalInvalid) {
        const errorMessage =
          decimal === 0 ? "只能輸入整數" : `最多只能輸入小數點後${decimal}位`;
        showInvalidHandler(errorMessage);
        return;
      }
      showInvalidHandler("");
    }, 300);
  };
  return (
    <CustomedTextField
      value={inputDispaly}
      variant="standard"
      type={textType}
      autoComplete="off"
      onChange={textType === "text" ? textChangeHandler : numberChangeHandler}
    />
  );
};

export default OneLineText;
