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

const MultiLineText: FC = () => {
  return (
    <Field>
      <Heading text="2.元愛阿無銀行氣爸陸香的下文臺滿要出。野導馬來麼上劇流不爸：時破滿……外因人居和參?" />
      <CustomTextareaAutosize minRows={3} />
    </Field>
  );
};

export default MultiLineText;
