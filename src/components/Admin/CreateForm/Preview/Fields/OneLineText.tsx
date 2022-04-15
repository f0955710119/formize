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
`;

const OneLineText: FC = () => {
  return <TextInput label="" variant="standard" />;
};

export default OneLineText;
