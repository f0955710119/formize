import { FC } from "react";

import AddOptionButton from "../UI/AddOptionButton";
import ChoiceOptionItem, {
  ChoiceWrapper,
} from "./QuestionContentItem/ChoiceOptionItem";

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
            key={i}
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
