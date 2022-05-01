import { FC } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

const TextInput = styled(TextField)`
  font-size: 1.8rem;
  width: 100%;
  margin-bottom: 1rem;
  & div,
  & input {
    font-size: inherit;
  }

  & .MuiFilledInput-root {
    background-color: transparent;
  }

  & .css-10botns-MuiInputBase-input-MuiFilledInput-input {
    color: ${(props) => props.theme.note};
  }

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before {
    border-bottom: 2px solid ${(props) => props.theme.placeholder};
  }

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:hover {
    background-color: transparent;
  }
  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root.Mui-focused {
    background-color: transparent;
  }

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-bottom: 2px solid ${(props) => props.theme.title};
  }
`;

const OneLineText: FC = () => {
  return <TextInput label="" variant="filled" />;
};

export default OneLineText;
