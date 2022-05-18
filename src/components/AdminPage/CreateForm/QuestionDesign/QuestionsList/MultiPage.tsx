import { FC } from "react";

import { Delete } from "@styled-icons/material/Delete";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import helper from "../../../../../utils/helper";
import CreatedQuestion from "./CreatedQuestion";
import QuestionPage from "./QuestionPage";


const CreatedQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;

const DeleteButton = styled(Delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #aaa;
  margin-right: 1rem;
  cursor: pointer;
  transition: fill 0.3s;

  &:hover {
    fill: #333;
  }

  @media ${breakpointConfig.mobileL} {
    display: none;
  }
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
                id={question.id}
                title={question.type === "2" ? "引言" : `${question.title}`}
                index={`${titleIndexArr[i]}`}
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
              <DeleteButton
                id={question.id}
                onClick={() => {
                  deleteQuestionHandler(question.id);
                }}
              />
              <CreatedQuestion
                id={question.id}
                title={question.type === "2" ? "引言" : `${question.title}`}
                index={`${titleIndexArr[i]}`}
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
