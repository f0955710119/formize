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
`;

interface SliderProps {
  id: string;
  min: number;
  max: number;
}

// 之後做這塊的取值不要用state的方式拿，寫ref去取，不然太耗能(畢竟state跟ref分開)
const Slider: FC<SliderProps> = ({ id, min, max }: SliderProps) => {
  return (
    <SliderWrapper>
      <span>{min}</span>
      <CustomSlider
        defaultValue={30}
        min={min}
        max={max}
        valueLabelDisplay="auto"
      />
      <span>{max}</span>
    </SliderWrapper>
  );
};

export default Slider;
