import { FC } from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NumberIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  width: 3rem;
  height: 3rem;

  border: 0.8px solid #c8c8c8;
`;
const NumberIcon = styled.span`
  font-size: 1.2rem;
`;

const TitleText = styled.span`
  font-size: 1.6rem;
`;
const IntervalLineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  width: 6rem;
  height: 100%;
`;

const IntervalLine = styled.span`
  width: 100%;
  height: 2px;
  background-color: #ccc;
`;

interface HeaderItemProps {
  number: number;
  title: string;
  isLastItem: boolean;
}

const HeaderItem: FC<HeaderItemProps> = ({
  number,
  title,
  isLastItem,
}: HeaderItemProps) => {
  return (
    <ItemWrapper>
      <NumberIconWrapper>
        <NumberIcon>{number}</NumberIcon>
      </NumberIconWrapper>
      <TitleText>{title}</TitleText>

      {!isLastItem && (
        <IntervalLineWrapper>
          <IntervalLine />
        </IntervalLineWrapper>
      )}
    </ItemWrapper>
  );
};

export default HeaderItem;
