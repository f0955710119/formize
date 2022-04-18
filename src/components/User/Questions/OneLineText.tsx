import { FC } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";

const CustomedTextField = styled(TextField)`
  width: 100%;
  & div,
  & input {
    width: 100%;
  }
`;

interface OneLineTextProps {
  textType: string;
  min?: number;
  max?: number;
  unit?: string;
  decimal?: number;
}

const OneLineText: FC<OneLineTextProps> = ({
  textType,
  max,
  min,
}: OneLineTextProps) => {
  return <CustomedTextField variant="standard" type={textType} />;
};

export default OneLineText;
