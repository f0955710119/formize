import { FC } from "react";
import styled from "styled-components";
import { FormControl, RadioGroup, Radio } from "@mui/material";
import breakpointConfig from "../../../../../../configs/breakpointConfig";

const CustomedFormControl = styled(FormControl)`
  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const CustomedRadioGroup = styled(RadioGroup)`
  flex-wrap: nowrap;
  width: 100%;
  & .css-qfz70r-MuiFormGroup-root {
  }
`;

interface matrixRadioProps {
  id: string;
  matrixs: string[];
}

const matrixRadio: FC<matrixRadioProps> = ({
  id,
  matrixs,
}: matrixRadioProps) => {
  return (
    <CustomedFormControl>
      <CustomedRadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {matrixs.map((matrix) => (
          <Radio
            key={matrix}
            value={matrix}
            name="question-radio-buttons"
            inputProps={{ "aria-label": `value-${matrix}` }}
            sx={{ width: "5.7rem" }}
          />
        ))}
      </CustomedRadioGroup>
    </CustomedFormControl>
  );
};

export default matrixRadio;
