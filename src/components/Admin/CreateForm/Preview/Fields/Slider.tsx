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
`;

const Slider: FC = () => {
  return (
    <SliderWrapper>
      <CustomSlider defaultValue={30} />
    </SliderWrapper>
  );
};

export default Slider;
