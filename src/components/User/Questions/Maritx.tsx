import { FC, useState } from "react";
import styled from "styled-components";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slice/userSlice";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";

const MartixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const MartixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin: 2rem 0;
  width: 100%;
`;

const MartixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

interface MartixRadioProps {
  optionIndex: number;
  martixs: string[];
  questionId: string;
}

const MartixRadio: FC<MartixRadioProps> = ({
  optionIndex,
  martixs,
  questionId,
}: MartixRadioProps) => {
  const dispatch = useAppDispatch();
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
        {martixs.map((martix) => (
          <Radio
            key={martix}
            value={martix}
            name="question-radio-buttons"
            inputProps={{ "aria-label": `value-${martix}` }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface MartixProps {
  options: string[];
  martixs: string[];
  questionId: string;
}

const Martix: FC<MartixProps> = ({
  options,
  martixs,
  questionId,
}: MartixProps) => {
  return (
    <MartixWrapper>
      <MartixTitleWrapper>
        {martixs.map((martix, i) => (
          <span key={i}>{martix}</span>
        ))}
      </MartixTitleWrapper>
      {options.map((option, i) => (
        <MartixOptions key={i}>
          <span key={i}>{option}</span>
          <MartixRadio
            optionIndex={i}
            martixs={martixs}
            questionId={questionId}
          />
        </MartixOptions>
      ))}
    </MartixWrapper>
  );
};

export default Martix;
