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
`;

const CustomRadioGroup = styled(RadioGroup)`
  align-items: end;
`;

interface CustomFormControlLabelProps {
  isActive: boolean;
}

// // prettier-ignore
// const CustomFormControlLabel = styled(FormControlLabel)<CustomFormControlLabelProps>`
//   margin-bottom: 1rem;
//   padding: 0.8rem 0;
//   width: 97.96%;
//   font-family: inherit;
//   border: 2px solid ${(props) =>
//     props.isActive ? props.theme.title : `${props.theme.title}60`
//   };
//   border-radius: 5px;
//   transition: border 0.3s;
//   & .css-ahj2mt-MuiTypography-root {
//     font-size: 1.8rem;
//     font-family: inherit;
//     margin-left: 1rem;
//     transform: translateY(0.1rem);
//   }
// `;

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
            isActive={answers[questionIdIndex].input === `${i + 1}.${option}`}
            value={`${i + 1}.${option}`}
            control={
              <CustomRadio
                checked={
                  answers[questionIdIndex].input === `${i + 1}.${option}`
                }
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
