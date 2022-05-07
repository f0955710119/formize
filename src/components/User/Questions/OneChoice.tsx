import { FC } from "react";
import styled from "styled-components";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CustomFormControl = styled(FormControl)`
  width: 100%;
  display: block;
  & .css-z7bf87-MuiFormGroup-root {
    /* flex-direction: row; */
  }
`;

const CustomRadioGroup = styled(RadioGroup)`
  align-items: end;
  /* display: flex;
  align-items: center;
  width: 100%;
  -webkit-flex-direction: row; */
`;

interface CustomFormControlLabelProps {
  isActive: boolean;
}
// prettier-ignore
const CustomFormControlLabel = styled(FormControlLabel)<CustomFormControlLabelProps>`
  margin-bottom: 1rem;
  padding: 0.8rem 0;
  width: 97.96%;
  font-family: inherit;
  border: 2px solid ${(props) => 
    props.isActive ? props.theme.title : `${props.theme.title}60`
  };
  border-radius: 5px;
  transition: border 0.3s;
  & .css-ahj2mt-MuiTypography-root {
    font-size: 1.8rem;
    font-family: inherit;
    margin-left: 1rem;
    transform: translateY(0.1rem);
  }
`;

const CustomRadio = styled(Radio)`
  /* font-size: 2rem; */
`;

const CustomRadioIcon = styled.span`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.theme.title};
  opacity: 0.5;
  border-radius: 50%;
  transition: opacity 0.3s;

  input:hover ~ & {
    background-color: "#30404d";
    opacity: 1;
    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
  }

  input:checked ~ & {
    opacity: 1;
  }
`;
const CustonCheckedIcon = styled(CustomRadioIcon)`
  background-color: ${(props) => props.theme.title};

  &::before {
    content: "";
    display: block;
    width: 2rem;
    height: 2rem;

    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
  }

  input:hover ~ & {
    background-color: "#30404d";
  }
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
          <CustomFormControlLabel
            isActive={answers[questionIdIndex].input === `${i + 1}.${option}`}
            value={`${i + 1}.${option}`}
            control={
              <CustomRadio
                checked={
                  answers[questionIdIndex].input === `${i + 1}.${option}`
                }
                icon={<CustomRadioIcon />}
                checkedIcon={<CustonCheckedIcon />}
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
