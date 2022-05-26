import { FC } from "react";

import styled from "styled-components";
import breakpointConfig from "../../configs/breakpointConfig";

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingImageWrapper = styled.div`
  width: 50rem;
  height: 50rem;

  @media ${breakpointConfig.tabletS} {
    width: 35rem;
    height: 35rem;
  }
`;

const LoadingIamge = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: grayLoading 2s linear infinite;

  @keyframes grayLoading {
    0% {
      filter: grayscale(50%);
    }

    100% {
      filter: grayscale(0%);
    }
  }
`;

const LoadingText = styled.div`
  position: relative;
  margin-bottom: 4rem;
  padding: 0 1rem;
  font-size: 3rem;
  color: #b8973c;
  font-weight: bold;
  width: 100%;
  text-align: center;

  animation: fontColor 2s linear infinite;

  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    content: "正在載入...";
    animation: contentText 1s linear infinite;

    @keyframes contentText {
      0% {
        content: "正在載入...";
      }

      50% {
        content: "正在載入..";
      }

      100% {
        content: "正在載入.";
      }
    }
  }

  @keyframes fontColor {
    0% {
      color: #d4c18a;
    }
    100% {
      color: #b8973c;
    }
  }
`;

interface LoadingProps {
  imageSrc?: string;
}

const Loading: FC<LoadingProps> = ({ imageSrc }) => {
  return (
    <LoadingContainer>
      <LoadingImageWrapper>
        <LoadingIamge
          src={!imageSrc ? "images/loading-image.svg" : imageSrc}
          alt="a loading image"
        />
      </LoadingImageWrapper>
      <LoadingText />
    </LoadingContainer>
  );
};

export default Loading;
