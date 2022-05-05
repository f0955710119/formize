import { FC, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import styleConfig from "../../configs/styleConfig";
import breakpointConfig from "../../configs/backgroundConfig";
import helper from "../../utils/helper";
import { Settings } from "../../types/form";
import { Question } from "../../types/question";
import QuestionList from "./QuestionList";

interface MainProps {
  font: string;
  backgroundImage: string;
  hasImage: boolean;
}

const FormContainer = styled.div`
  width: 100%;
  height: 70%;
  padding: 4rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MultiPageFormContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90rem;
  width: 100%;
  height: 100vh;

  background-image: url("/images/main-bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const MultiPageFormQuestionButtonText = styled.span`
  font-size: 1.4rem;
  color: #fff;
`;

interface MultiPageFormQuestionButtonProps {
  isLastPage: boolean;
}

const MultiPageFormQuestionButton = styled.button<MultiPageFormQuestionButtonProps>`
  position: absolute;
  ${(props) => (props.isLastPage ? "left: 30%" : "right: 30%")};
  bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 4rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.note};
  }

  &:hover > ${MultiPageFormQuestionButtonText} {
    color: #333;
  }
  /* 
  @media ${breakpointConfig.tabletS} {
    width: 80%;
    ${(props) =>
    props.isLastPage
      ? "left: 0; bottom: 9rem;"
      : "right: 0;left:0; bottom: 4rem;"}
  } */
`;

interface MultiplePageSectionProps {
  setNavigatePage: Dispatch<SetStateAction<number>>;
  settings: Settings;
  questions: Question[];
  sendResponses: () => Promise<void>;
}

const MultiplePageSection: FC<MultiplePageSectionProps> = ({
  setNavigatePage,
  settings,
  questions,
  sendResponses,
}) => {
  const [questionPage, setQuestionPage] = useState<number>(0);
  const indexInDifferentPageArr = helper.generateQuestionMultiPageIndexArr(
    settings.pageQuantity,
    questions
  );
  const questionsInDiffernetPageArr = helper.generateDifferentPageQuestionsArr(
    settings.pageQuantity,
    questions
  );
  return (
    <MultiPageFormContainer>
      <FormContainer>
        <MultiPageFormQuestionButton
          isLastPage
          onClick={() => {
            if (questionPage === 0) {
              setNavigatePage(0);
              return;
            }
            setQuestionPage((prevState) => prevState - 1);
          }}
        >
          <MultiPageFormQuestionButtonText>
            {questionPage === 0 ? "回到歡迎頁" : "上一頁"}
          </MultiPageFormQuestionButtonText>
        </MultiPageFormQuestionButton>
        <MultiPageFormQuestionButton
          isLastPage={false}
          onClick={() => {
            if (questionPage === questionsInDiffernetPageArr.length - 1) {
              sendResponses();
              return;
            }
            setQuestionPage((prevState) => prevState + 1);
          }}
        >
          <MultiPageFormQuestionButtonText>
            {questionPage === questionsInDiffernetPageArr.length - 1
              ? "送出問卷回覆"
              : "下一頁"}
          </MultiPageFormQuestionButtonText>
        </MultiPageFormQuestionButton>
        {questions
          .filter((question) => question.page === questionPage + 1)
          .map((question, i) => {
            return (
              <QuestionList
                titleIndex={indexInDifferentPageArr[questionPage][i]}
                question={question}
              />
            );
          })}
      </FormContainer>
    </MultiPageFormContainer>
  );
};

export default MultiplePageSection;
