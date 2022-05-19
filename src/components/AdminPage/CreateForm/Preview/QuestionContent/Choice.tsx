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
        {options.map((_, i) => (
          <ChoiceOptionItem key={i} id={id} index={i} options={options} />
        ))}
      </ChoiceWrapper>
    </>
  );
};

export default OneChoice;
