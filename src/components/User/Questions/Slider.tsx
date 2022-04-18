import { FC } from "react";
import styled from "styled-components";
import UISlider from "@mui/material/Slider";

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
  min?: number;
  max?: number;
  unit?: string;
  interval?: number;
}

// 之後做這塊的取值不要用state的方式拿，寫ref去取，不然太耗能(畢竟state跟ref分開)
const Slider: FC<SliderProps> = ({ min, max, unit, interval }: SliderProps) => {
  const hasMax = max ? max : 100;
  const hasMin = min ? min : 1;
  return (
    <SliderWrapper>
      <span>{unit ? hasMin + unit : hasMin}</span>
      <CustomSlider
        defaultValue={30}
        step={interval ? interval : 1}
        min={hasMin}
        max={hasMax}
        valueLabelDisplay="auto"
      />
      <span>{unit ? hasMax + unit : hasMax}</span>
    </SliderWrapper>
  );
};

export default Slider;
