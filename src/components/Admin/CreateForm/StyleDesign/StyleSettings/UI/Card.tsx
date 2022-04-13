// title / background / colorBar(之後直接用做圖，不用刻)
// Card / Button ( router ) / O[tion hEADER] / able to scroll
import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  height: 15rem;
`;

const CardItem = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #aaa; // 之後變成圖片
`;

const CardTitle = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.6rem;
`;

interface CardProps {
  title: string;
}

const Card: FC<CardProps> = ({ title }: CardProps) => {
  return (
    <CardWrapper>
      <CardItem />
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  );
};

export default Card;
