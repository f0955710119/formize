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
import breakpointConfig from "../../../configs/breakpointConfig";
import useResizeWindow from "../../../hooks/useResizeWindow";

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  width: 100%;

  & .MuiFormControl-root {
    width: 70%;
    align-items: end;

    @media ${breakpointConfig.tablet} {
      width: 100%;
      align-items: end;
    }
  }

  & .MuiFormGroup-root {
    @media ${breakpointConfig.tablet} {
      width: 100%;
      flex-direction: column;
    }
  }

  & .PrivateSwitchBase-root {
    width: 8rem;

    @media ${breakpointConfig.tablet} {
      width: auto;
      padding: 0;
    }
  }

  & .MuiRadio-root:hover {
    background-color: transparent;
  }
`;
const MatrixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin: 2rem 0;
  width: 100%;

  @media ${breakpointConfig.tablet} {
    display: none;
  }
`;

const MartixTitle = styled.span`
  margin: 0 0.5rem;
  width: 7rem;
  font-size: 1.4rem;
  text-align: center;

  @media ${breakpointConfig.tablet} {
    display: none;
  }
`;

const MatrixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${(props) => `${props.theme.option}`};

  @media ${breakpointConfig.tablet} {
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
`;

const MatrixOption = styled.span`
  width: 30%;
  font-size: 1.7rem;
  color: ${(props) => props.theme.title};

  @media ${breakpointConfig.tablet} {
    margin-bottom: 1rem;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${breakpointConfig.tablet} {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const TabletRadioTitle = styled.span`
  line-height: 3.8rem;
  display: none;

  @media ${breakpointConfig.tablet} {
    width: 5rem;
    display: block;
    margin-right: 0.5rem;
  }

  @media ${breakpointConfig.tablet} {
    width: auto;
    display: block;
    margin-left: 1rem;
  }
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
  const existingInput = answers[questionIdIndex] ? answers[questionIdIndex].input : "";

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
          <RadioWrapper>
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
            <TabletRadioTitle>{matrix}</TabletRadioTitle>
          </RadioWrapper>
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

const Matrix: FC<MatrixProps> = ({ options, matrixs, questionId }: MatrixProps) => {
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
          <MatrixRadio optionIndex={i} matrixs={matrixs} questionId={questionId} />
        </MatrixOptions>
      ))}
    </MatrixWrapper>
  );
};

export default Matrix;
