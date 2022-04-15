import { FC, useState, useRef } from "react";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import styled from "styled-components";
import { TextField } from "@mui/material";
import questionConfig from "../../../../../../../utils/questionConfig";

const CustomTextInput = styled(TextField)`
  width: 65%;
  height: 100%;
  border-radius: 0px;

  & div {
    border-radius: 0px;
    height: 100%;
  }

  & .MuiInputBase-input::placeholder {
    color: #aaa;
    opacity: 1;
  }
`;

interface TextInputProps {
  id?: string;
  min?: number;
  max?: number;
  unit?: string;
  interval?: number;
  decimal?: number;
  validationType: string;
  label?: string;
  placeholder?: string;
  inputType?: string;
  defaultValue?: string;
  dispatchHandler: (value: string, errorMessage?: string) => void;
}

const TextInput: FC<TextInputProps> = ({
  id,
  min,
  max,
  unit,
  interval,
  decimal,
  validationType,
  label,
  placeholder,
  inputType,
  defaultValue,
  dispatchHandler,
}: TextInputProps) => {
  const [inputRecord, setInputRecord] = useState<string>(() => {
    switch (validationType) {
      case questionConfig.MIN: {
        return "" + min;
      }
      case questionConfig.MAX: {
        return "" + max;
      }

      case questionConfig.UNIT: {
        return "" + unit;
      }

      case questionConfig.INTERVAL: {
        return "" + interval;
      }

      case questionConfig.DECIMAL: {
        return "" + decimal;
      }
      default:
        return "";
    }
  });
  const delayChecking = useRef<NodeJS.Timeout>(
    setTimeout(() => {
      console.log("start checking!");
    }, 0)
  );
  console.log(inputRecord);
  return (
    <CustomTextInput
      value={inputRecord}
      label={label}
      placeholder={placeholder}
      type={inputType}
      onChange={(event) => {
        setInputRecord(event.target.value);
        clearTimeout(delayChecking.current);
        delayChecking.current = setTimeout(() => {
          dispatchHandler(event.target.value);
          event.target.blur();
        }, 500);
      }}
    />
  );
};

export default TextInput;
