import { FC } from "react";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";

const CustomComboBox = styled(Autocomplete)`
  width: 65%;
  height: 100%;
  border-radius: 0px;

  & div {
    height: 100%;
    border-radius: 0px;
  }

  & button {
    transform: translateY(2px);
  }
`;

interface ComboBoxProps {
  options: string[];
}

const ComboBox: FC<ComboBoxProps> = ({ options }: ComboBoxProps) => {
  return (
    <CustomComboBox
      disablePortal
      defaultValue={options[0]}
      options={options}
      renderInput={(params) => <TextField {...params} label="" />}
    />
  );
};

export default ComboBox;
