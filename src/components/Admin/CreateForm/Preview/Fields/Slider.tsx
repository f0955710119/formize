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
  min: number;
  max: number;
}

const Slider: FC<SliderProps> = ({ min, max }: SliderProps) => {
  console.log(max);
  console.log(min);
  return (
    <SliderWrapper>
      <span>{min}</span>
      <CustomSlider
        defaultValue={Math.round((max - min) * 0.3)}
        min={min}
        max={max}
        valueLabelDisplay="auto"
      />
      <span>{max}</span>
    </SliderWrapper>
  );
};

export default Slider;
