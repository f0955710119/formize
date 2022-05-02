import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: inline-block;
  align-items: center;
  width: 15rem;
  margin-bottom: 2rem;
`;

const CardItem = styled.div`
  display: inline-block;
  width: 15rem;
  height: 13rem;
  background-color: #aaa;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
  width: 100%;
  text-align: center;
  height: 2rem;
  font-size: 2rem;
`;

interface CardProps {
  title: string;
  dispatchHandler?: (title: string, url?: string) => void;
}

const Card: FC<CardProps> = ({ title, dispatchHandler }: CardProps) => {
  return (
    <CardWrapper
      onClick={() => {
        console.log(title);
        dispatchHandler && dispatchHandler(title);
      }}
    >
      <CardItem />
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  );
};

export default Card;
