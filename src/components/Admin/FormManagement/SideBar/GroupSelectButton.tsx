import { FC } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  width: 100%;
  height: 3.2rem;
  color: #333;
  background-color: #c8c8c8;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #cddfff;
    background-color: #173976;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

interface GroupSelectButtonProps {
  buttonText: string;
}

const GroupSelectButton: FC<GroupSelectButtonProps> = ({
  buttonText,
}: GroupSelectButtonProps) => {
  return (
    <ButtonWrapper>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonWrapper>
  );
};

export default GroupSelectButton;
