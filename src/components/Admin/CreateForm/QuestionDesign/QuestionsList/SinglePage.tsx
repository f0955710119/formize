import { FC } from "react";

import styled from "styled-components";
import { Delete } from "@styled-icons/material/Delete";
import CreatedQuestion from "./CreatedQuestion";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import icons from "../QuestionIcon";

const CreatedQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  /* @media ${breakpointConfig.laptopM} {
    display: inline-block;
    width: auto;
    margin-top: 0rem;
  } ; */
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
        title={type === "2" ? "引言" : title}
        note={note}
        questionType={type}
        index={index}
      />
    </CreatedQuestionWrapper>
  );
};

export default SinglePage;
