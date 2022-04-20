import { FC } from "react";
import styled from "styled-components";
import ChoiceOptionItem, { ChoiceWrapper } from "./ChoiceOptionItem";
import AddOptionButton from "../UI/AddOptionButton";
import helper from "../../../../../utils/helper";

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
          <ChoiceOptionItem
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

// 單選的格式
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

// 多選的格式
{
  /* <MultiChoiceWrapper>
      {options.map((option) => (
        <FormControlLabel
          key={helper.generateId(6)}
          control={
            <Checkbox icon={<CircleIcon />} checkedIcon={<CircleIcon />} />
          }
          label={option}
          labelPlacement="end"
        />
      ))}
    </MultiChoiceWrapper> */
}
