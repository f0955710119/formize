import { FC } from "react";
import styled from "styled-components";
import { FormControlLabel, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const MultiChoiceWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface MultiChoiceProps {
  id: string;
}

const MultiChoice: FC = () => {
  return (
    // 這邊要做按鈕可以新增選項 / 編輯選項文字 / 移除選項
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
  );
};

export default MultiChoice;
