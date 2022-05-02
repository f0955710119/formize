import { FC } from "react";

import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import CreatedQuestion from "./CreatedQuestion";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import icons from "../../UI/icons";

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

  /* @media ${breakpointConfig.laptopM} {
    display: none;
  } */
`;

const DeleteButton = styled(icons.delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #aaa;
`;

interface SingplePageProps {
  id: string;
  type: string;
  title: string;
  note: string;
  deleteQuestionHandler: (questionId: string) => void;
}

const SinglePage: FC<SingplePageProps> = ({
  id,
  type,
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
      />
    </CreatedQuestionWrapper>
  );
};

export default SinglePage;
