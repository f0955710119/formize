import { FC } from "react";

import AddOptionButton from "../UI/AddOptionButton";
import ChoiceOptionItem, { ChoiceWrapper } from "./QuestionContentItem/ChoiceOptionItem";

interface ChoiceProps {
  id: string;
  options: string[];
}

const Choice: FC<ChoiceProps> = ({ id, options }) => {
  return (
    <>
      <AddOptionButton id={id} options={options} />
      <ChoiceWrapper>
        {options.map((option, i) => (
          <ChoiceOptionItem key={i} id={id} index={i} options={options} option={option} />
        ))}
      </ChoiceWrapper>
    </>
  );
};

export default Choice;
