import { FC } from "react";
import styled from "styled-components";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Field from "./Field";
import Heading from "../QuestionHeading/UI/Heading";

const OneChoice: FC = () => {
  return (
    <Field>
      <Heading text="3.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！" />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="able" control={<Radio />} label="other" />
        </RadioGroup>
      </FormControl>
    </Field>
  );
};

export default OneChoice;
