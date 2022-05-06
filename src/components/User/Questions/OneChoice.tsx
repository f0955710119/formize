import { FC } from "react";
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

interface OneChoiceProps {
  options: string[];
  questionId: string;
}

const OneChoice: FC<OneChoiceProps> = ({ options, questionId }) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="one-choice-question"
        name="one-choice-question-radio-buttons-group"
        onChange={(event) => {
          const input = event.target.value;
          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
        }}
      >
        {options.map((option, i) => (
          <FormControlLabel
            value={`${i + 1}.${option}`}
            control={
              <Radio
                checked={
                  answers[questionIdIndex].input === `${i + 1}.${option}`
                }
              />
            }
            label={option}
            key={i}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default OneChoice;
