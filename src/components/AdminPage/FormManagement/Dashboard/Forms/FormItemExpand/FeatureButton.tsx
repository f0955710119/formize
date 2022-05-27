import { FC } from "react";

import styled from "styled-components";

const ButtonText = styled.span`
  font-size: 1.4rem;
  color: inherit;
`;

interface ButtonWrapperProps {
  styleText?: string;
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
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

  ${(props: ButtonWrapperProps) => props.styleText}
`;

interface FeatureButtonProps {
  text: string;
  style?: {
    [key: string]: string;
  };
  styleText?: string;
  clickHandler?: () => void;
}

const FeatureButton: FC<FeatureButtonProps> = ({
  text,
  style,
  clickHandler,
  styleText,
}) => {
  return (
    <ButtonWrapper
      onClick={clickHandler}
      style={{ ...style }}
      styleText={styleText}
    >
      <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default FeatureButton;
