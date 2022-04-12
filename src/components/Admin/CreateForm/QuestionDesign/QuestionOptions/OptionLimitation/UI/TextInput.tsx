import { FC } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

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
  label?: string;
  placeholder?: string;
  inputType?: string;
  defaultValue?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  placeholder,
  inputType,
  defaultValue,
}: TextInputProps) => {
  return (
    <CustomTextInput
      label={label}
      placeholder={placeholder}
      type={inputType}
      defaultValue={defaultValue}
    />
  );
};

export default TextInput;
