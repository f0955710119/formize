import { FC } from "react";

import { Delete } from "@styled-icons/material/Delete";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import CreatedQuestion from "./CreatedQuestion";


const CreatedQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 100%;

  @media ${breakpointConfig.mobileL} {
    display: none;
  }
`;

const DeleteButton = styled(Delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #aaa;
  cursor: pointer;
  transition: fill 0.3s;

  &:hover {
    fill: #333;
  }
`;

interface SingplePageProps {
  id: string;
  type: string;
  index: string;
  title: string;
  note: string;
  deleteQuestionHandler: (questionId: string) => void;
}

const SinglePage: FC<SingplePageProps> = ({
  id,
  type,
  index,
  title,
  note,
  deleteQuestionHandler,
}: SingplePageProps) => {
  return (
    <CreatedQuestionWrapper>
      <DeleteButtonWrapper onClick={() => deleteQuestionHandler(id)}>
        <DeleteButton />
      </DeleteButtonWrapper>
      <CreatedQuestion
        id={id}
        title={type === "2" ? "引言" : title}
        note={note}
        questionType={type}
        index={index}
      />
    </CreatedQuestionWrapper>
  );
};

export default SinglePage;
