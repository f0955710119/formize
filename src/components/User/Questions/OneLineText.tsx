import { FC } from "react";
import { TextField } from "@mui/material";

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
  return <TextField variant="standard" type={textType} />;
};

export default OneLineText;
