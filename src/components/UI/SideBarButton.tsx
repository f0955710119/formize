import { FC } from "react";
import styled from "styled-components";

import { RightArrow } from "@styled-icons/boxicons-solid/RightArrow";

interface ButtonWrapper {
  active: boolean;
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  width: 100%;
  height: 3.2rem;
  color: ${({ active }: ButtonWrapper) => (active ? "#e9f1ff" : "#333")};
  background-color: ${({ active }: ButtonWrapper) =>
    active ? "#646665" : "transparent"};
  cursor: pointer;

  &:hover {
    color: #e9f1ff;
    background-color: #b4bcb7;
  }
`;

const ButtonIcon = styled(RightArrow)`
  color: inherit;
  margin-right: 0.5rem;
  width: 1rem;
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
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
