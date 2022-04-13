import { FC, ReactNode } from "react";

interface ButtonProps {
  clickHandler(): void;
  children: ReactNode;
  buttonType?: "button" | "submit" | "reset" | undefined;
}

const Button: FC<ButtonProps> = ({
  clickHandler,
  buttonType,
  children,
}: ButtonProps) => {
  return (
    <button type={buttonType ? buttonType : "button"} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
