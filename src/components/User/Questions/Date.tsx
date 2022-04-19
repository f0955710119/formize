import { FC, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomTextField = styled(TextField)`
  color: ${(props) => props.theme.note};
  & div,
  & fieldset,
  & input {
    border: none;
  }

  border: 2px solid transparent;
  & .Mui-focused {
    transition: border 0.3s;
    border: 2px solid ${(props) => props.theme.title};
  }
`;

const Date: FC = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns as any}>
      <DatePicker
        label=""
        value={value}
        onChange={(newValue) => {
          setValue(newValue as Date);
        }}
        renderInput={(params) => <CustomTextField {...(params as any)} />}
      />
    </LocalizationProvider>
  );
};

export default Date;
