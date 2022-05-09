import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 3px;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #eff9f8;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #aaa;
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
