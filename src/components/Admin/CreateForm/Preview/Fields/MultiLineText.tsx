import { FC } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/material";
import Field from "./UI/Field";
import TitleIndex from "./UI/TitleIndex";

const CustomTextareaAutosize = styled(TextareaAutosize)`
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

interface MultiLineTextProps {
  id: string;
}

const MultiLineText: FC = () => {
  return <CustomTextareaAutosize minRows={3} />;
};

export default MultiLineText;
