import { FC, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import useResetInputValue from "../../../hooks/useResetInputValue";

// prettier-ignore
const CustomTextareaAutosize = styled(TextField)`
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0px;
  resize: none;

  & div,
  & input {
    font-size: 1.6rem;
  }
  &:focus {
    outline: none;
  }
`;

interface MultiLineTextProps {
  questionId: string;
  maxLength?: number;
}

const MultiLineText: FC<MultiLineTextProps> = ({ questionId, maxLength }) => {
  const {
    invalidMessage,
    setInvalidMessage,
    isInvalid,
    setIsInvalid,
    showInvalidHandler,
  } = useCheckAnswerValid();

  const validTimerHandler = useCheckValidTimer();
  const dispatch = useAppDispatch();
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const resetInputHandler = useResetInputValue();

  return (
    <CustomTextareaAutosize
      error={isInvalid}
      // isValid={isInvalid}
      minRows={5}
      maxRows={maxLength ? Math.round(maxLength / 100) * 5 : 10}
      multiline
      onChange={(event) => {
        const input = event.target.value;
        validTimerHandler(() => {
          setIsInvalid(false);
          setInvalidMessage("");
          const hasMaxLengthInvalid =
            maxLength && event.target.value.length > maxLength;

          if (input === "") {
            resetInputHandler(questionIdIndex);
            return;
          }

          if (!hasMaxLengthInvalid) {
            dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
            return;
          }
          showInvalidHandler(`不能超過${maxLength}字`);
        }, 300);
      }}
      helperText={invalidMessage}
    />
  );
};

export default MultiLineText;
