import { FC } from "react";

import styled from "styled-components";

const DeleteButtonWrapper = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.4rem;
  font-family: jfOpenhuninn;
  color: #333;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #c8c8c8;
    color: red;
  }
`;

interface QuestionDeleteButtonProps {
  text: string;
  id: string;
  clickHandler: () => void;
}

const QuestionDeleteButton: FC<QuestionDeleteButtonProps> = ({
  text,
  id,
  clickHandler,
}) => {
  return (
    <DeleteButtonWrapper onClick={clickHandler} id={id}>
      {text}
    </DeleteButtonWrapper>
  );
};

export default QuestionDeleteButton;
