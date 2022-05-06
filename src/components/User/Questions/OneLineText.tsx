import { FC, ChangeEventHandler } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import { useAppSelector } from "../../../hooks/useAppSelector";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import useResetInputValue from "../../../hooks/useResetInputValue";

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
  const {
    invalidMessage,
    setInvalidMessage,
    isInvalid,
    setIsInvalid,
    showInvalidHandler,
  } = useCheckAnswerValid();
  const checkValidTimerHandler = useCheckValidTimer();
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const resetInputHandler = useResetInputValue();

  const textChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    checkValidTimerHandler(() => {
      setIsInvalid(false);
      setInvalidMessage("");
      const input = event.target.value;
      const hasLengthInvalid = length && input.length > length;

      if (input === "") {
        resetInputHandler(questionIdIndex);
        return;
      }

      if (!hasLengthInvalid) {
        dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
        return;
      }
      showInvalidHandler(`字數不能超過${length}字`);
    }, 300);
  };

  const numberChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    checkValidTimerHandler(() => {
      setIsInvalid(false);
      setInvalidMessage("");
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

      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
    }, 300);
  };
  return (
    <CustomedTextField
      error={isInvalid}
      variant="standard"
      type={textType}
      autoComplete="off"
      onChange={textType === "text" ? textChangeHandler : numberChangeHandler}
      helperText={invalidMessage}
    />
  );
};

export default OneLineText;
