import { FC } from "react";

import styled from "styled-components";

const TitleIndexText = styled.span`
  align-self: stretch;
  font-size: 2.2rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.title};
  cursor: default;
`;

interface TitleIndexProps {
  titleIndex: string;
}

const TitleIndex: FC<TitleIndexProps> = ({ titleIndex }: TitleIndexProps) => {
  return <TitleIndexText>{titleIndex}</TitleIndexText>;
};

export default TitleIndex;
