import { FC } from "react";

import { RightArrow } from "@styled-icons/boxicons-solid/RightArrow";
import styled from "styled-components";


interface ButtonWrapper {
  active: boolean;
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  width: 100%;
  height: 3.2rem;
  color: ${({ active }: ButtonWrapper) => (active ? "#fff" : "#333")};
  background-color: ${({ active }: ButtonWrapper) =>
    active ? "#7f6c39" : "transparent"};
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #b4bcb7;
  }
`;

const ButtonIcon = styled(RightArrow)`
  color: inherit;
  margin-right: 0.5rem;
  width: 1rem;
`;

const ButtonText = styled.span`
  font-size: 1.5rem;
`;

interface SideBarButtonProps {
  buttonText: string;
  active: boolean;
  clickHandler: () => void;
}

const SideBarButton: FC<SideBarButtonProps> = ({
  buttonText,
  active,
  clickHandler,
}: SideBarButtonProps) => {
  return (
    <ButtonWrapper active={active} onClick={clickHandler}>
      {active && <ButtonIcon />}
      <ButtonText>{buttonText}</ButtonText>
    </ButtonWrapper>
  );
};

export default SideBarButton;
