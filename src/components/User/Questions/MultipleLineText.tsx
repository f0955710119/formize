import { FC, useState } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/material";

interface CustomTextareaAutosizeProps {
  isValid: boolean;
}

// prettier-ignore
const CustomTextareaAutosize = styled(TextareaAutosize)<CustomTextareaAutosizeProps>`
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0px;
  resize: none;

  border: 1px solid ${(props) => (props.isValid ? props.theme.note : "red")};

  &:focus {
    outline: none;
  }
`;

interface MultiLineTextProps {
  maxLength: number;
}

const MultiLineText: FC<MultiLineTextProps> = ({ maxLength }) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  console.log(maxLength);
  return (
    <CustomTextareaAutosize
      isValid={isValid}
      minRows={3}
      onChange={(event) => {
        if (+event.target.value.length <= maxLength) {
          !isValid && setIsValid(true);
          return;
        }
        setIsValid(false);
      }}
    />
  );
};

export default MultiLineText;
