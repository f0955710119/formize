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
        {options.map((_, i) => (
          <ChoiceOptionItem key={i} id={id} index={i} options={options} />
        ))}
      </ChoiceWrapper>
    </>
  );
};

export default Choice;
