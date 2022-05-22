import { FC, useEffect, useRef, useState } from "react";

import { TextField } from "@mui/material";
import styled from "styled-components";

import questionConfig from "../../../../../../../configs/questionConfig";
import useAppDispatch from "../../../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../../../hooks/useAppSelector";
import useGetQuestion from "../../../../../../../hooks/useQuestion";
import { questionActions } from "../../../../../../../store/slice/questionSlice";
import { Question } from "../../../../../../../types/question";

const CustomTextInput = styled(TextField)`
  width: 65%;
  height: 100%;
  border-radius: 0px;

  & div {
    border-radius: 3px;
    height: 100%;
  }

  & label {
    font-size: 1.4rem;
    display: none;
    background-color: transparent;
  }

  & .MuiInputBase-input::placeholder {
    color: #aaa;
    opacity: 1;
  }

  & .MuiOutlinedInput-input {
    font-size: 1.4rem;
    cursor: text;
  }

  & legend {
    display: none;
  }
`;

const { LENGTH, MIN, MAX, UNIT, INTERVAL, DECIMAL, MAX_SELECTED } = questionConfig;

interface TextInputProps {
  id: string;
  validationType: string;
  label?: string;
  inputType?: string;
  defaultValue?: string;
  placeholder?: string;
  dispatchHandler: (value: string, errorMessage?: string) => void;
}

const TextInput: FC<TextInputProps> = ({
  id,
  validationType,
  label,
  inputType,
  placeholder,
  dispatchHandler,
}: TextInputProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;
  const { willSwitcEditinghQuestion } = useAppSelector((state) => state.question);
  const { validations } = question;
  const { length, min, max, unit, interval, maxSelected } = validations;

  const inputValueConfig: { [key: string]: string } = {
    [LENGTH]: "" + length,
    [MIN]: "" + min,
    [MAX]: "" + max,
    [UNIT]: "" + unit,
    [INTERVAL]: "" + interval,
    [MAX_SELECTED]: "" + maxSelected,
  };

  const [inputValue, setInputValue] = useState<string>(inputValueConfig[validationType]);
  const delayChecking = useRef<NodeJS.Timeout>(
    setTimeout(() => {
      return;
    }, 0)
  );

  useEffect(() => {
    if (!willSwitcEditinghQuestion) return;
    setInputValue(inputValueConfig[validationType]);
    dispatch(questionActions.willChangeLimitationValue(false));
  }, [willSwitcEditinghQuestion]);

  return (
    <CustomTextInput
      value={inputValue}
      label={label}
      type={inputType}
      placeholder={placeholder}
      onChange={(event) => {
        setInputValue(event.target.value);
        clearTimeout(delayChecking.current);
        delayChecking.current = setTimeout(() => {
          dispatchHandler(event.target.value);
          event.target.blur();
        }, 600);
      }}
    />
  );
};

export default TextInput;
