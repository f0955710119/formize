import { FC, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";

const Date: FC = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Field>
      <Heading text="8.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！ *" />
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
    </Field>
  );
};

export default Date;
