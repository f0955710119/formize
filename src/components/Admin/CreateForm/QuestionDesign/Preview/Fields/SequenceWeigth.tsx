import { FC } from "react";
import styled from "styled-components";
import Heading from "../QuestionHeading/UI/Heading";
import Field from "./Field";

const defaultOptionsList = ["Frontend", "Backend", "iOS", "Android"];

const OptionList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  /* height: 3rem; */
  border: 1px solid #333;
`;

const SelectedOptionList = styled(OptionList)`
  height: 5rem;
  background-color: #fff;
  opacity: 0.7;
`;

interface OptionItemProps {
  number: number;
}

const OptionItem = styled.div<OptionItemProps>`
  width: ${(props: OptionItemProps) => `calc(100% / ${props.number} - 2%)`};
  /* height: 100%; */
  background-color: #f90;
  cursor: pointer;
`;

const SequenceWeight: FC = () => {
  return (
    <Field>
      <Heading text="7.東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！" />
      <OptionList>
        {defaultOptionsList.map((item, i) => (
          <OptionItem key={i} number={defaultOptionsList.length}>
            {item}
          </OptionItem>
        ))}
      </OptionList>
      <SelectedOptionList>
        {defaultOptionsList.map((item, i) => (
          <OptionItem key={i} number={defaultOptionsList.length}>
            {item}
          </OptionItem>
        ))}
      </SelectedOptionList>
    </Field>
  );
};

export default SequenceWeight;
