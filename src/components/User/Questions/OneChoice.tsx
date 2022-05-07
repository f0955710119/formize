import { FC } from "react";
import styled from "styled-components";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";

import {
  CustomIcon,
  CustomCheckedIcon,
  CustomFormLabel,
} from "./ChoiceIcon/icon";

const CustomFormControl = styled(FormControl)`
  width: 100%;
  display: block;

  & .css-j204z7-MuiFormControlLabel-root {
    margin-right: 0;
    width: 100%;
  }

  & .css-1snu36k-MuiButtonBase-root-MuiRadio-root:hover {
    background-color: transparent;
  }
`;

const CustomRadioGroup = styled(RadioGroup)`
  align-items: end;
`;

const CustomRadio = styled(Radio)`
  /* font-size: 2rem; */
`;

interface OneChoiceProps {
  options: string[];
  questionId: string;
}

const OneChoice: FC<OneChoiceProps> = ({ options, questionId }) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const existingInput = answers[questionIdIndex]
    ? answers[questionIdIndex].input
    : "";
  return (
    <CustomFormControl>
      <CustomRadioGroup
        aria-labelledby="one-choice-question"
        name="one-choice-question-radio-buttons-group"
        onChange={(event) => {
          const input = event.target.value;
          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
        }}
      >
        {options.map((option, i) => (
          <CustomFormLabel
            active={existingInput === `${i + 1}.${option}` ? "true" : "false"}
            value={`${i + 1}.${option}`}
            control={
              <CustomRadio
                disableRipple
                disableTouchRipple
                checked={existingInput === `${i + 1}.${option}`}
                icon={<CustomIcon />}
                checkedIcon={<CustomCheckedIcon />}
                size="medium"
              />
            }
            label={option}
            key={i}
          />
        ))}
      </CustomRadioGroup>
    </CustomFormControl>
  );
};

export default OneChoice;
