import { FC } from "react";
import styled from "styled-components";
import { FormControlLabel, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import Field from "./Field";
import Heading from "../QuestionHeading/UI/Heading";

const MultiChoiceWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface MultiChoiceProps {
  id: string;
}

const MultiChoice: FC = () => {
  return (
    <Field>
      <Heading text="4.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！" />
      <MultiChoiceWrapper>
        <FormControlLabel
          control={
            <Checkbox icon={<CircleIcon />} checkedIcon={<CircleIcon />} />
          }
          label="選項1"
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox icon={<CircleIcon />} checkedIcon={<CircleIcon />} />
          }
          label="選項2"
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox icon={<CircleIcon />} checkedIcon={<CircleIcon />} />
          }
          label="選項3"
          labelPlacement="end"
        />
      </MultiChoiceWrapper>
    </Field>
  );
};

export default MultiChoice;
