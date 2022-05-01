import { FC } from "react";
import styled from "styled-components";

const ButtonText = styled.span`
  font-size: 1.4rem;
  color: inherit;
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  padding: 0.8rem 0.4rem;
  height: 2.2rem;
  border-radius: 5px;
  background-color: transparent;
  color: #646665;
  cursor: pointer;

  &:hover {
    background-color: #646665;
  }

  &:hover > ${ButtonText} {
    color: #fff;
  }
`;

interface FeatureButtonProps {
  text: string;
  style?: {
    [key: string]: string;
  };
  clickHandler?: () => void;
}

const FeatureButton: FC<FeatureButtonProps> = ({
  text,
  style,
  clickHandler,
}) => {
  return (
    <ButtonWrapper onClick={clickHandler} style={{ ...style }}>
      <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default FeatureButton;
