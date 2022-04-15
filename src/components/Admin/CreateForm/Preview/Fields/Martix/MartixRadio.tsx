import { FC } from "react";
import { FormControl, RadioGroup, Radio } from "@mui/material";

interface MartixRadioProps {
  id: string;
  martixs: string[];
}

const MartixRadio: FC<MartixRadioProps> = ({
  id,
  martixs,
}: MartixRadioProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {martixs.map((martix) => (
          <Radio
            key={martix}
            value={martix}
            name="question-radio-buttons"
            inputProps={{ "aria-label": `value-${martix}` }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MartixRadio;
