import { ChangeEventHandler, FC, useState } from "react";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../../store/slice/questionSlice";

import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import questionActionType from "../../../../../../../store/actionType/questionActionType";
import helper from "../../../../../../../utils/helper";

interface ComboBoxProps {
  options: string[];
}

const ComboBox: FC<ComboBoxProps> = ({ options }: ComboBoxProps) => {
  const [selectedOtpion, setSelectedOption] = useState<string>(options[0]);
  const { editingQuestion } = useAppSelector((state) => state.question);
  const { questions } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  return (
    <FormControl>
      <Select
        value={selectedOtpion}
        onChange={(event) => {
          if (editingQuestion) {
            const { id, validations } = editingQuestion;
            const { value } = event.target;
            setSelectedOption(value);
            dispatch(
              questionActions.updateSiglePropOfQuestion({
                id,
                actionType: questionActionType.VALIDATIONS,
                validations: {
                  ...validations,
                  textType: helper.generateTextType(value),
                },
              })
            );
          }
        }}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBox;
