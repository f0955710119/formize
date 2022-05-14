import { FC } from "react";
import styled from "styled-components";
import ChoiceOptionItem, { ChoiceWrapper } from "./ChoiceOptionItem";
import { FormControlLabel, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import helper from "../../../../../utils/helper";

const MultiChoiceWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface MultiChoiceProps {
  id: string;
  options: string[];
}

const MultiChoice: FC<MultiChoiceProps> = ({
  id,
  options,
}: MultiChoiceProps) => {
  return (
    <MultiChoiceWrapper>
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          control={
            <Checkbox icon={<CircleIcon />} checkedIcon={<CircleIcon />} />
          }
          label={option}
          labelPlacement="end"
        />
      ))}
    </MultiChoiceWrapper>
  );
};

export default MultiChoice;
