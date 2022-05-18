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

  & [class*="-MuiInputBase-input-MuiOutlinedInput-input"] {
    font-size: 1.4rem;
    cursor: text;
  }

  & legend {
    display: none;
  }
`;

interface TextInputProps {
  id: string;
  validationType: string;
  label?: string;
  placeholder?: string;
  inputType?: string;
  defaultValue?: string;
  dispatchHandler: (value: string, errorMessage?: string) => void;
}

const TextInput: FC<TextInputProps> = ({
  id,
  validationType,
  label,
  placeholder,
  inputType,
  defaultValue,
  dispatchHandler,
}: TextInputProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;
  const { willSwitcEditinghQuestion } = useAppSelector(
    (state) => state.question
  );
  const { validations } = question;
  const getInputValue = (validationType: string) => {
    switch (validationType) {
      case questionConfig.LENGTH: {
        return "" + validations.length;
      }
      case questionConfig.MIN: {
        return "" + validations.min;
      }
      case questionConfig.MAX: {
        return "" + validations.max;
      }

      case questionConfig.UNIT: {
        return "" + validations.unit;
      }

      case questionConfig.INTERVAL: {
        return "" + validations.interval;
      }

      case questionConfig.DECIMAL: {
        return "" + validations.decimal;
      }

      case questionConfig.MAX_SELECTED: {
        return "" + validations.maxSelected;
      }

      case questionConfig.DATE: {
        if (defaultValue) {
          return defaultValue;
        }
      }
      default: {
        return "";
      }
    }
  };
  const [inputValue, setInputValue] = useState<string>(
    getInputValue(validationType)
  );
  const delayChecking = useRef<NodeJS.Timeout>(
    setTimeout(() => {
      return;
    }, 0)
  );

  useEffect(() => {
    if (!willSwitcEditinghQuestion) return;
    setInputValue(getInputValue(validationType));
    dispatch(questionActions.willChangeLimitationValue(false));
  }, [willSwitcEditinghQuestion]);

  return (
    <CustomTextInput
      value={inputValue}
      label={label}
      placeholder={placeholder}
      type={inputType}
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
