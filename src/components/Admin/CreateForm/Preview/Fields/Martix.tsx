import { FC } from "react";
import styled from "styled-components";
// import { FormControlLabel, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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
`;

const MartixTitle = styled.div`
  width: calc(33% / 3);
  text-align: center;
`;

const MartixOptionTitle = styled.span`
  width: 50%;
  font-size: 1.8rem;
`;

const MartixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Martix: FC = () => {
  return (
    <MartixWrapper>
      <MartixTitleWrapper>
        {/* 要能新增 */}
        <MartixTitle>1</MartixTitle>
        <MartixTitle>2</MartixTitle>
        <MartixTitle>3</MartixTitle>
      </MartixTitleWrapper>
      <MartixOptions>
        <MartixOptionTitle>測試題目</MartixOptionTitle>
        {/* 這邊一樣要能新增 */}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </MartixOptions>
      <MartixOptions>
        <MartixOptionTitle>測試題目</MartixOptionTitle>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </MartixOptions>
    </MartixWrapper>
  );
};

export default Martix;
