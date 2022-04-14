import { FC } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";
import TitleIndex from "./TitleIndex";
import Note from "./Note";
import questionActionType from "../../../../../store/actionType/questionActionType";

const TextInput = styled(TextField)`
  font-size: 1.8rem;

  & div,
  & input {
    font-size: inherit;
  }
`;

interface OneLineTextProps {
  id: string;
  note: string;
}

const OneLineText: FC<OneLineTextProps> = ({ id, note }: OneLineTextProps) => {
  return (
    <Field>
      <TitleIndex id={id} />
      <Heading text="東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！ *" />
      <Note id={id} note={note} actionType={questionActionType.NOTE} />
      <TextInput label="" variant="standard" />
    </Field>
  );
};

export default OneLineText;
