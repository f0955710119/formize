import { FC, useState } from "react";

import UISlider from "@mui/material/Slider";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CustomSlider = styled(UISlider)`
  width: 80%;
  color: ${(props) => props.theme.title};
  & .css-187mznn-MuiSlider-root {
    color: ${(props) => props.theme.title};
  }
  & .MuiSlider-rail {
    color: ${(props) => props.theme.title};
  }
`;

interface SliderProps {
  questionId: string;

  min?: number;
  max?: number;
  unit?: string;
  interval?: number;
}

const Slider: FC<SliderProps> = ({
  questionId,
  min,
  max,
  unit,
  interval,
}: SliderProps) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const checkValidTimerHandler = useCheckValidTimer();
  const showInvalidHandler = useCheckAnswerValid(questionId);

  const hasMax = max ? max : 100;
  const hasMin = min ? min : 1;

  const [inputDispaly, setInputDisplay] = useState<number>(() => {
    if (!answers[questionIdIndex]) return hasMin;
    const { input } = answers[questionIdIndex];
    if (input === null) return hasMin;
    return +input;
  });

  const changeSliderHandler = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    setInputDisplay(+value);
    const input = "" + value;
    dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));

    checkValidTimerHandler(() => {
      if (!event.target) return;
      showInvalidHandler("");
    }, 500);
  };

  return (
    <SliderWrapper>
      <span style={{ marginRight: "2rem" }}>
        {unit ? hasMin + unit : hasMin}
      </span>
      <CustomSlider
        value={inputDispaly}
        step={interval ? interval : 1}
        min={hasMin}
        max={hasMax}
        valueLabelDisplay="auto"
        onChange={changeSliderHandler}
      />
      <span style={{ marginLeft: "2rem" }}>
        {unit ? hasMax + unit : hasMax}
      </span>
    </SliderWrapper>
  );
};

export default Slider;
