import { FC } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import useDeleteQuestion from "../../../../../hooks/useDeleteQuestion";

import styled from "styled-components";
import Layout from "../../UI/Layout";

import helper from "../../../../../utils/helper";
import MultiPage from "./MultiPage";
import SinglePage from "./SinglePage";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import scrollBar from "../../../../UI/scrollBar";

interface ListLayoutProps {
  isMultiplePage: boolean;
}

const ListLayout = styled(Layout)<ListLayoutProps>`
  width: 20%;
  @media ${breakpointConfig.laptopM} {
    width: 100%;
    height: ${(props: ListLayoutProps) =>
      props.isMultiplePage ? "auto" : "17rem"};
    order: 2;
    padding: 2rem 3rem 0 3rem;
  }
  @media ${breakpointConfig.tablet} {
    padding: 2rem 6rem 0 6rem;
    margin-bottom: 1rem;
  } ;
`;

interface QuestionWrapperProps {
  isMultiplePage: boolean;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: calc(100% - 4.7rem);
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  ${scrollBar}

  @media ${breakpointConfig.laptopM} {
    margin-bottom: 0;
    padding-right: 0;
    padding-bottom: 1.5rem;
    width: 100%;
    height: 100%;

    ${(props: QuestionWrapperProps) =>
      props.isMultiplePage
        ? " overflow-y: auto;overflow-x: hidden; max-height: 50rem;"
        : "overflow-y: hidden; overflow-x: scroll; max-height: 12rem; flex-direction: row;"}

    display: flex;

    &::-webkit-scrollbar {
      height: 0.5rem;
      background-color: #f5f5f5;
    }
  } ;
`;

const Heading = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  color: #c9ab59;
  border-bottom: 0.1px solid #c9ab59;

  @media ${breakpointConfig.laptopM} {
    margin-bottom: 0;
  } ;
`;

const NoQuestionsReminder = styled.div`
  width: 100%;
  text-align: center;
  line-height: 50rem;
  @media ${breakpointConfig.laptopM} {
    position: relative;
    height: 8rem;
    line-height: 9.5rem;
    background-color: #e8e8e8;

    &::after {
      content: "";
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      width: 100%;
      height: 1.5rem;
      background-color: #e8e8e8;
    }
  }
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

  const hasQuestions = questions.length > 0;
  const isMultiplePage = mode === "1";

  const renderQuestionsList = isMultiplePage ? (
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
        const handledTitle = type === "2" ? "引言" : `${title}`;
        return (
          <SinglePage
            key={id}
            id={id}
            type={type}
            index={`${indexArr[i]}`}
            title={handledTitle}
            note={note}
            deleteQuestionHandler={deleteQuestionHandler}
          />
        );
      })}
    </>
  );

  return (
    <ListLayout isMultiplePage={isMultiplePage}>
      <Heading>題目列表</Heading>
      <QuestionWrapper isMultiplePage={isMultiplePage}>
        {hasQuestions ? (
          renderQuestionsList
        ) : (
          <NoQuestionsReminder>此為空的題目列表</NoQuestionsReminder>
        )}
      </QuestionWrapper>
    </ListLayout>
  );
};

export default QuestionsList;
