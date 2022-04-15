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
    // 這邊要做按鈕可以新增選項 / 編輯選項文字 / 移除選項
    <MultiChoiceWrapper>
      {options.map((option) => (
        <FormControlLabel
          key={helper.generateId(6)}
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
