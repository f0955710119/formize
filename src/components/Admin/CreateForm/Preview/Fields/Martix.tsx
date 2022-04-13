import { FC } from "react";
import styled from "styled-components";
// import { FormControlLabel, Checkbox } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Field from "./Field";
import Heading from "../QuestionHeading/UI/Heading";

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
  /* align-items: end; */
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
    <Field>
      <Heading text="5.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！" />
      <MartixWrapper>
        <MartixTitleWrapper>
          <MartixTitle>1</MartixTitle>
          <MartixTitle>2</MartixTitle>
          <MartixTitle>3</MartixTitle>
        </MartixTitleWrapper>
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
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
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
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </MartixOptions>
      </MartixWrapper>
    </Field>
  );
};

export default Martix;
