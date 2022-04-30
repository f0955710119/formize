import styled from "styled-components";

export const TableContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #8e9aa2;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #8e9aa2;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;
