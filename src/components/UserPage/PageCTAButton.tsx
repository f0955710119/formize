import { FC } from "react";

import styled from "styled-components";

const ButtonWrapper = styled.button`
  position: absolute;
  right: 3.6rem;
  bottom: 7.5rem;
  width: 16rem;
  height: 3.4rem;
  line-height: 3rem;
  border-radius: 5px;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;
`;

interface PageCTAButtonProps {
  text: string;
  clickHandler?: () => void;
  className?: string;
}

const PageCTAButton: FC<PageCTAButtonProps> = ({
  text,
  clickHandler,
  className,
}) => {
  return (
    <ButtonWrapper onClick={clickHandler} className={className}>
      {text}
    </ButtonWrapper>
  );
};

export default PageCTAButton;
