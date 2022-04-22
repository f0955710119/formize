import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

import QuestionPage from "./QuestionPage";
import CreatedQuestion from "./CreatedQuestion";

import helper from "../../../../../utils/helper";

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
`;

interface MultiPageProps {
  page: number;
  titleIndexArr: string[];
  deleteQuestionHandler: (questionId: string) => void;
}

const MultiPage: FC<MultiPageProps> = ({
  page,
  titleIndexArr,
  deleteQuestionHandler,
}: MultiPageProps) => {
  const { questions } = useAppSelector((state) => state.question);
  const indexArr = helper.generateQuestionIndexArr(questions);

  return (
    <QuestionPage title={`第${helper.generateChineseNumberString(page)}頁`}>
      {questions
        .filter((question) => question.page === page + 1)
        .map((question, i) => (
          <CreatedQuestionWrapper key={question.id}>
            <DeleteButtonWrapper
              onClick={() => deleteQuestionHandler(question.id)}
            >
              <DeleteSharpIcon
                sx={{
                  width: "100%",
                  height: "2.4rem",
                  fill: "#c8c8c8",
                  cursor: "pointer",
                }}
              />
            </DeleteButtonWrapper>
            <CreatedQuestion
              title={
                question.type === "2"
                  ? "引言"
                  : `${titleIndexArr[i]} ${question.title}`
              }
              note={question.note}
              questionType={question.type}
            />
          </CreatedQuestionWrapper>
        ))}
    </QuestionPage>
  );
};

export default MultiPage;
