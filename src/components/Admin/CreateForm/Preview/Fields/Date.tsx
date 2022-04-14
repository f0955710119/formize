import { FC, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DateProps {
  id: string;
  title: string;
  note: string;
}

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
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default Date;
