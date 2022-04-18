import { FC } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface OneChoiceProps {
  options: string[];
}

const OneChoice: FC<OneChoiceProps> = ({ options }) => {
  console.log(options);
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="one-choice-question"
        name="one-choice-question-radio-buttons-group"
      >
        {options.map((option, i) => (
          <FormControlLabel
            value={option}
            control={<Radio />}
            label={option}
            key={i}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default OneChoice;
