import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";

const TitleIndexText = styled.span`
  font-size: 2.2rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.title};
`;

interface TitleIndexProps {
  titleIndex: string;
}

const TitleIndex: FC<TitleIndexProps> = ({ titleIndex }: TitleIndexProps) => {
  const { questions } = useAppSelector((state) => state.question);
  return <TitleIndexText>{titleIndex}</TitleIndexText>;
};

export default TitleIndex;
