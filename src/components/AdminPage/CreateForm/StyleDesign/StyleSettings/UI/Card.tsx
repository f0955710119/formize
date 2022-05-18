import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../../../configs/breakpointConfig";

interface CardWrapperProps {
  isActive: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  display: inline-block;
  align-items: center;
  width: 15rem;
  margin-bottom: 2rem;
  cursor: pointer;
  border: 3px solid ${(props) => (props.isActive ? "#c9ab59" : "transparent")};
  border-radius: 7px;
  padding: 1rem;
  transition: transform 0.3s, border 0.3s;

  &:hover {
    transform: translateY(1rem);
  }

  @media ${breakpointConfig.laptopM} {
    min-width: 12rem;
    min-height: 10rem;
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
  min-width: 12rem;
  min-height: 10rem;
  width: 100%;
  background-color: #eee;
  margin-bottom: 0.5rem;
  border-radius: 9px;
  cursor: pointer;

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
  cursor: pointer;
`;

interface CardProps {
  title: string;
  isActive: boolean;
  imageUrl?: string;
  font?: string;
  isBackground?: boolean;
  dispatchHandler?: (title: string, url?: string) => void;
}

const Card: FC<CardProps> = ({
  title,
  isActive,
  imageUrl,
  font,
  isBackground,
  dispatchHandler,
}: CardProps) => {
  return (
    <CardWrapper
      isActive={isActive}
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
