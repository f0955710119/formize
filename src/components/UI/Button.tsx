import { FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

interface ButtonProps {
  text: string;
  className?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  clickHandler: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { text, clickHandler, buttonType, className } = props;
  return (
    <StyledButton
      type={buttonType ? buttonType : "button"}
      className={className}
      onClick={() => {
        clickHandler();
      }}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
