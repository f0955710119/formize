import { FC } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";

const TextInput = styled(TextField)`
  font-size: 1.8rem;

  & div,
  & input {
    font-size: inherit;
  }
`;

const PreviewOneLineTextField: FC = () => {
  return (
    <Field>
      <Heading text="1.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！ *" />
      <TextInput label="" variant="standard" />
    </Field>
  );
};

export default PreviewOneLineTextField;
