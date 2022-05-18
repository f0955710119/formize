import { FC } from "react";

import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";
import helper from "../../../utils/helper";
import { CustomIcon, CustomCheckedIcon } from "./ChoiceIcon/icon";

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & .MuiFormControl-root {
    width: 60%;
    align-items: end;
  }

  & .PrivateSwitchBase-root {
    width: 8rem;
  }

  & .MuiRadio-root:hover {
    background-color: transparent;
  }
`;
const MatrixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin: 2rem 0;
  width: 100%;
`;

const MartixTitle = styled.span`
  margin: 0 0.5rem;
  width: 7rem;
  font-size: 1.4rem;
  text-align: center;
`;

const MatrixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${(props) => `${props.theme.option}`};
`;

const MatrixOption = styled.span`
  width: 40%;
  font-size: 1.7rem;
  color: ${(props) => props.theme.title};
`;

interface MatrixRadioProps {
  optionIndex: number;
  matrixs: string[];
  questionId: string;
}

const MatrixRadio: FC<MatrixRadioProps> = ({
  optionIndex,
  matrixs,
  questionId,
}: MatrixRadioProps) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const questionIdIndex = useGetQuestionIdIndex(`${questionId}_${optionIndex}`);
  const existingInput = answers[questionIdIndex]
    ? answers[questionIdIndex].input
    : "";

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) => {
          const input = event.target.value;
          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
          showInvalidHandler("");
        }}
      >
        {matrixs.map((matrix) => (
          <Radio
            disableRipple
            icon={<CustomIcon />}
            checkedIcon={<CustomCheckedIcon />}
            key={helper.generateId(8)}
            value={matrix}
            name="question-radio-buttons"
            inputProps={{ "aria-label": `value-${matrix}` }}
            checked={existingInput === matrix}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface MatrixProps {
  options: string[];
  matrixs: string[];
  questionId: string;
}

const matrix: FC<MatrixProps> = ({
  options,
  matrixs,
  questionId,
}: MatrixProps) => {
  return (
    <MatrixWrapper>
      <MatrixTitleWrapper>
        {matrixs.map((matrix, i) => (
          <MartixTitle key={i}>{matrix}</MartixTitle>
        ))}
      </MatrixTitleWrapper>
      {options.map((option, i) => (
        <MatrixOptions key={i}>
          <MatrixOption key={i}>{option}</MatrixOption>
          <MatrixRadio
            optionIndex={i}
            matrixs={matrixs}
            questionId={questionId}
          />
        </MatrixOptions>
      ))}
    </MatrixWrapper>
  );
};

export default matrix;
