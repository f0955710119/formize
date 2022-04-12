import { FC } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/material";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";

const CustomTextareaAutosize = styled(TextareaAutosize)`
  padding: 1rem;
  width: 100%;
  border-radius: 0px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const PreviewMultiLineTextField: FC = () => {
  return (
    <Field>
      <Heading text="1.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！ *" />
      <CustomTextareaAutosize minRows={3} />
    </Field>
  );
};

export default PreviewMultiLineTextField;
