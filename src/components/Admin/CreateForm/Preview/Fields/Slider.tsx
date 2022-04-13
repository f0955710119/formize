import { FC } from "react";
import styled from "styled-components";
import UISlider from "@mui/material/Slider";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";

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
    <Field>
      <Heading text="6.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！" />
      <SliderWrapper>
        <CustomSlider defaultValue={30} />
      </SliderWrapper>
    </Field>
  );
};

export default Slider;
