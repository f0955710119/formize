import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import helper from "../../../../../../utils/helper";

const TitleIndexText = styled.span`
  font-size: 2.2rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.title};
`;

interface TitleIndexProps {
  id: string;
}

const TitleIndex: FC<TitleIndexProps> = ({ id }: TitleIndexProps) => {
  const { questions } = useAppSelector((state) => state.question);
  return (
    <TitleIndexText>
      {helper.generateQuestionIndex(id, questions)}
    </TitleIndexText>
  );
};

export default TitleIndex;
