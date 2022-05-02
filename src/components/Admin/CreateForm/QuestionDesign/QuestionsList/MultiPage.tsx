import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

import QuestionPage from "./QuestionPage";
import CreatedQuestion from "./CreatedQuestion";

import helper from "../../../../../utils/helper";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import breakpointConfig from "../../../../../configs/breakpointConfig";

import icons from "../../UI/icons";

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

  /* @media ${breakpointConfig.laptopM} {
    display: none;
  } */
`;

const DeleteButton = styled(icons.delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #aaa;
  margin-right: 1rem;
  /* @media ${breakpointConfig.laptopM} */
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
  const dispatch = useAppDispatch();
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const filteredQuestions = questions.filter(
    (question) => question.page === page
  );

  return (
    <>
      {page === 1 && (
        <QuestionPage
          title={`第${helper.generateChineseNumberString(page - 1)}頁`}
          isActive={editingFormPage === page}
          page={page}
        >
          {filteredQuestions.map((question, i) => (
            <CreatedQuestionWrapper key={question.id}>
              <DeleteButton
                id={question.id}
                onClick={() => {
                  deleteQuestionHandler(question.id);
                }}
              />
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
      )}
      {page !== 1 && filteredQuestions.length > 0 && (
        <QuestionPage
          title={`第${helper.generateChineseNumberString(page - 1)}頁`}
          isActive={editingFormPage === page}
          page={page}
        >
          {filteredQuestions.map((question, i) => (
            <CreatedQuestionWrapper key={question.id}>
              <DeleteButtonWrapper>
                <DeleteSharpIcon
                  onClick={() => {
                    deleteQuestionHandler(question.id);
                  }}
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
      )}
    </>
  );
};

export default MultiPage;
