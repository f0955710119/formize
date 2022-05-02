import { FC } from "react";
import styled from "styled-components";

const DeleteButtonWrapper = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  font-size: 1.4rem;
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
