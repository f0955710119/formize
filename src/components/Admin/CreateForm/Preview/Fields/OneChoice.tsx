import { FC } from "react";
import styled from "styled-components";
import OneChoiceOptionItem from "./OneChoiceOptionItem";
import AddOptionButton from "./UI/AddOptionButton";
import helper from "../../../../../utils/helper";

const ChoiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

interface OneChoiceProps {
  id: string;
  options: string[];
}

const OneChoice: FC<OneChoiceProps> = ({ id, options }: OneChoiceProps) => {
  return (
    <>
      <AddOptionButton id={id} options={options} />
      <ChoiceWrapper>
        {options.map((option, i) => (
          <OneChoiceOptionItem
            key={helper.generateId(6)}
            id={id}
            index={i}
            option={option}
            options={options}
          />
        ))}
      </ChoiceWrapper>
    </>
  );
};

export default OneChoice;

// <FormControl>
//   <RadioGroup
//     row
//     aria-labelledby="question-one-choice-group"
//     name="row-radio-buttons-group"
//   >
//     {options.map((option) => (
//       <FormControlLabel
//         value={option}
//         control={<Radio />}
//         label={option}
//         key={helper.generateId(8)}
//       />
//     ))}
//   </RadioGroup>
// </FormControl>
