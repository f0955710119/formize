import { FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../../../configs/breakpointConfig";

const CardWrapper = styled.div`
  display: inline-block;
  align-items: center;
  width: 15rem;
  margin-bottom: 2rem;

  @media ${breakpointConfig.laptopM} {
    min-width: 15rem;
    min-height: 13rem;
    margin-right: 1rem;
  } ;
`;

interface CardItemProps {
  imageUrl: string;
  font: string;
  isBackground: boolean;
}

const CardItem = styled.div<CardItemProps>`
  display: inline-block;
  width: 15rem;
  height: 13rem;
  background-color: #eee;
  margin-bottom: 0.5rem;

  ${(props) => {
    return props.imageUrl
      ? `
      background-image: url(${props.imageUrl});
      background-repeat:no-repeat;
      background-size:${props.isBackground ? "155%" : "cover"};
      ${props.isBackground ? "" : "background-position: center;"}
      
    `
      : "";
  }}

  ${(props) => {
    return props.font
      ? `
      position:relative;
      &::after {
        content:'字體';  
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        font-size:2.6rem;
        font-family:${props.font}
      }`
      : "";
  }}
`;

const CardTitle = styled.div`
  width: 100%;
  text-align: center;
  height: 2rem;
  font-size: 2rem;
`;

interface CardProps {
  title: string;
  imageUrl?: string;
  font?: string;
  isBackground?: boolean;
  dispatchHandler?: (title: string, url?: string) => void;
}

const Card: FC<CardProps> = ({
  title,
  imageUrl,
  font,
  isBackground,
  dispatchHandler,
}: CardProps) => {
  return (
    <CardWrapper
      onClick={() => {
        dispatchHandler && dispatchHandler(title);
      }}
    >
      <CardItem
        imageUrl={imageUrl ? imageUrl : ""}
        font={font ? font : ""}
        isBackground={isBackground ? true : false}
      />
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  );
};

export default Card;
