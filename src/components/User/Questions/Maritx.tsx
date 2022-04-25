import { FC } from "react";
import styled from "styled-components";
import { FormControl, RadioGroup, Radio } from "@mui/material";

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
  martixs: string[];
}

const MartixRadio: FC<MartixRadioProps> = ({ martixs }: MartixRadioProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
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
}

const Martix: FC<MartixProps> = ({ options, martixs }: MartixProps) => {
  // 之後樣式用綁ref的方式去得到title的width值，來改變選項的位置 > window.getComputedStyle(document.querySelector('#mainbar')).width
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
          <MartixRadio martixs={martixs} />
        </MartixOptions>
      ))}
    </MartixWrapper>
  );
};

export default Martix;
