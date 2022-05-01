import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import useDeleteQuestion from "../../../../../hooks/useDeleteQuestion";

import styled from "styled-components";
import Layout from "../../UI/Layout";

import helper from "../../../../../utils/helper";
import MultiPage from "./MultiPage";
import SinglePage from "./SinglePage";

const ListLayout = styled(Layout)`
  width: 18%;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: calc(100% - 4.7rem);
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b4bcb7;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

const Heading = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
  color: #7a807c;
  border-bottom: 0.1px solid #7a807c;
`;

const QuestionsList: FC = () => {
  const { mode, pageQuantity } = useAppSelector((state) => state.setting);
  const { questions } = useAppSelector((state) => state.question);

  const deleteQuestionHandler = useDeleteQuestion();

  const indexArr = helper.generateQuestionIndexArr(questions);
  const multiPageQuestionIndexArr = helper.generateQuestionMultiPageIndexArr(
    pageQuantity,
    questions
  );

  return (
    <ListLayout>
      <Heading>題目列表</Heading>
      <QuestionWrapper>
        {mode === "1" ? (
          <>
            {Array(pageQuantity)
              .fill(null)
              .map((_, i) => (
                <MultiPage
                  key={i}
                  page={i + 1}
                  titleIndexArr={multiPageQuestionIndexArr[i]}
                  deleteQuestionHandler={deleteQuestionHandler}
                />
              ))}
          </>
        ) : (
          <>
            {questions.map((question, i) => {
              const { id, type, note, title } = question;
              const handledTitle =
                type === "2" ? "引言" : `${indexArr[i]} ${title}`;
              return (
                <SinglePage
                  key={id}
                  id={id}
                  type={type}
                  title={handledTitle}
                  note={note}
                  deleteQuestionHandler={deleteQuestionHandler}
                />
              );
            })}
          </>
        )}
      </QuestionWrapper>
    </ListLayout>
  );
};

export default QuestionsList;
