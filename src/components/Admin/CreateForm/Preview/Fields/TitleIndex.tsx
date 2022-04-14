import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import helper from "../../../../../utils/helper";

interface TitleIndexProps {
  id: string;
}

const TitleIndex: FC<TitleIndexProps> = ({ id }: TitleIndexProps) => {
  const { questions } = useAppSelector((state) => state.question);
  return <span>{helper.generateQuestionIndex(id, questions)}</span>;
};

export default TitleIndex;
