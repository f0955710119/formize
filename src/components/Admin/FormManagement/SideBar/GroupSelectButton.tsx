import { FC } from "react";
import styled from "styled-components";

interface ButtonWrapper {
  active: boolean;
}

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  width: 100%;
  height: 3.2rem;
  color: ${({ active }: ButtonWrapper) => (active ? "#e9f1ff" : "#333")};
  background-color: ${({ active }: ButtonWrapper) =>
    active ? "#173976" : "#c8c8c8"};
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #e9f1ff;
    background-color: #173976;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

interface GroupSelectButtonProps {
  buttonText: string;
  active: boolean;
}

const GroupSelectButton: FC<GroupSelectButtonProps> = ({
  buttonText,
  active,
}: GroupSelectButtonProps) => {
  return (
    <ButtonWrapper active={active}>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonWrapper>
  );
};

export default GroupSelectButton;
