// title / background / colorBar(之後直接用做圖，不用刻)
// Card / Button ( router ) / O[tion hEADER] / able to scroll
import { FC } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: inline-block;
  width: 15rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  height: 15rem;
`;

const CardItem = styled.div`
  display: inline-block;
  width: 100%;
  height: 13rem;
  background-color: #aaa; // 之後變成圖片
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
  width: 100%;
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
