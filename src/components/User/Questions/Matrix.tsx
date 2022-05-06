import { FC, useState } from "react";
import styled from "styled-components";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import helper from "../../../utils/helper";
import { useAppSelector } from "../../../hooks/useAppSelector";

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const MatrixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin: 2rem 0;
  width: 100%;
`;

const MatrixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
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
  const questionIdIndex = useGetQuestionIdIndex(`${questionId}_${optionIndex}`);

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) => {
          const input = event.target.value;
          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
        }}
      >
        {matrixs.map((matrix) => (
          <Radio
            key={helper.generateId(8)}
            value={matrix}
            name="question-radio-buttons"
            inputProps={{ "aria-label": `value-${matrix}` }}
            checked={answers[questionIdIndex].input === matrix}
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
          <span key={i}>{matrix}</span>
        ))}
      </MatrixTitleWrapper>
      {options.map((option, i) => (
        <MatrixOptions key={i}>
          <span key={i}>{option}</span>
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
