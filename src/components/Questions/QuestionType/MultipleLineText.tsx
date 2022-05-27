import { FC, useState } from "react";

import TextField from "@mui/material/TextField";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import useResetInputValue from "../../../hooks/useResetInputValue";
import { userActions } from "../../../store/slice/userSlice";

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
  const { answers } = useAppSelector((state) => state.user);
  const validTimerHandler = useCheckValidTimer();
  const dispatch = useAppDispatch();
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const resetInputHandler = useResetInputValue();

  const [inputDispaly, setInputDisplay] = useState<string>(() => {
    if (!answers[questionIdIndex]) return "";
    const { input } = answers[questionIdIndex];
    if (input === null) return "";
    return input;
  });

  return (
    <CustomTextareaAutosize
      value={inputDispaly}
      minRows={5}
      maxRows={maxLength ? Math.round(maxLength / 100) * 5 : 10}
      multiline
      onChange={(event) => {
        const input = event.target.value;
        setInputDisplay(input);
        validTimerHandler(() => {
          const hasMaxLengthInvalid = maxLength && event.target.value.length > maxLength;

          if (input === "") {
            resetInputHandler(questionIdIndex);
            return;
          }

          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));

          if (hasMaxLengthInvalid) {
            showInvalidHandler(`不能超過${maxLength}字`);
            return;
          }
          showInvalidHandler("");
        }, 300);
      }}
    />
  );
};

export default MultiLineText;
