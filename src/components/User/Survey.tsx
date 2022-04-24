import { FC, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";
import type { UserSurvey } from "../../types/userSurvey";
import helper from "../../utils/helper";
import questionConfig from "../../configs/questionConfig";

import OneLineText from "./Questions/OneLineText";
import MultipleLineText from "./Questions/MultipleLineText";
import Introduction from "./Questions/Introdction";
import OneChoice from "./Questions/OneChoice";
import MultiChoice from "./Questions/MultipleChoice";
import Martix from "./Questions/Maritx";
import Slider from "./Questions/Slider";
import Sort from "./Questions/Sort";
import Date from "./Questions/Date";
import styleConfig from "../../configs/styleConfig";
import StartPageSection from "./StartPageSection";
import EndPageSection from "./EndPageSection";

type SurveyProps = UserSurvey;
interface MainProps {
  font: string;
  backgroundImage: string;
}

const SinglePageMain = styled.main<MainProps>`
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  background-image: ${(props: MainProps) => `url(${props.backgroundImage})`};
  background-size: cover;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MultiPageMain = styled.main<MainProps>`
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  /* background-image: ${(props: MainProps) =>
    `url(${props.backgroundImage})`}; */
  /* background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://images.unsplash.com/photo-1485686531765-ba63b07845a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"); */

  background-size: cover;

  overflow: hidden;
`;

const SinglePageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SinglePageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 96rem;
`;

const MultiPageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  ${(props: MultiPageFormQuestionButtonProps) =>
    props.isLastPage
      ? "left: calc(100% - 96rem)"
      : "right: calc(100% - 96rem)"};
  bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 4rem;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.note};
  }

  &:hover > ${MultiPageFormQuestionButtonText} {
    color: #333;
  }
`;

const SurveyContainer = styled.div`
  width: 96rem;
  height: 70%;
  padding: 4rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => {
    return props.theme.title;
  }};

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const NoteText = styled.div`
  width: 100%;
  color: #aaa;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.note}; ;
`;

const RequireQuestionTag = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: 5rem;
  height: 2.4rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 24px;
  color: ${(props) => props.theme.optionText};
`;

const generateResponsedUserSurveyQuestion = (
  questionType: string,
  question: Question
) => {
  switch (questionType) {
    case questionConfig.ONE_LINE_TEXT: {
      if (!question.validations.length) return;
      return (
        <OneLineText
          textType="text"
          length={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.MULTIPLE_LINE_TEXT: {
      return (
        <MultipleLineText
          maxLength={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.INTRODUCTION: {
      return <Introduction textContent={question.title} />;
    }

    case questionConfig.ONE_CHOICE: {
      if (question.options) {
        return <OneChoice options={question.options} />;
      }
    }

    case questionConfig.MULTIPLE_CHOICE: {
      if (question.options && question.validations.maxSelected) {
        return (
          <MultiChoice
            options={question.options}
            maxSelected={question.validations.maxSelected}
          />
        );
      }
    }

    case questionConfig.MARTIX: {
      if (question.options && question.martixs) {
        return <Martix options={question.options} martixs={question.martixs} />;
      }
    }

    case questionConfig.NUMBER: {
      return (
        <OneLineText
          textType="number"
          questionId={question.id}
          max={question.validations.max}
          min={question.validations.min}
          decimal={question.validations.decimal}
        />
      );
    }

    case questionConfig.SLIDER: {
      return (
        <Slider
          max={question.validations.max && question.validations.max}
          min={question.validations.min && question.validations.min}
          unit={question.validations.unit && question.validations.unit}
          interval={
            question.validations.interval && question.validations.interval
          }
        />
      );
    }

    case questionConfig.SORT: {
      if (question.options && question.validations.maxSelected) {
        return (
          <Sort
            options={question.options}
            maxSelected={question.validations.maxSelected}
          />
        );
      }
      return;
    }
    case questionConfig.DATE: {
      return <Date />;
    }
  }
};

const Survey: FC<SurveyProps> = ({
  responseDocId,
  questions,
  settings,
  styles,
}: SurveyProps) => {
  const [navigatePage, setNavigatePage] = useState<number>(0);
  const [questionPage, setQuestionPage] = useState<number>(0);
  const indexArr = helper.generateQuestionIndexArr(questions);
  const indexInDifferentPageArr = helper.generateQuestionMultiPageIndexArr(
    settings.pageQuantity,
    questions
  );
  const questionsInDiffernetPageArr = helper.generateDifferentPageQuestionsArr(
    settings.pageQuantity,
    questions
  );

  return (
    <>
      {settings.mode === "0" && (
        <SinglePageMain
          font={styles.font}
          backgroundImage={styles.backgroundImages[0]}
        >
          <StartPageSection
            title={settings.title}
            imageUrl={settings.startPageImageFile}
            startPageParagraph={settings.startPageParagraph}
            mode={settings.mode}
          />
          <SinglePageFormSection>
            <SinglePageFormContainer>
              {questions.map((question, i) => {
                return (
                  <QuestionContainer key={i}>
                    {question.type !== "2" && (
                      <>
                        <Heading>
                          {helper.generateUserSurveyQuestionTitle(
                            indexArr[i],
                            question.title
                          )}
                        </Heading>
                        <NoteText>{question.note}</NoteText>
                      </>
                    )}
                    {generateResponsedUserSurveyQuestion(
                      question.type,
                      question
                    )}
                  </QuestionContainer>
                );
              })}
            </SinglePageFormContainer>
          </SinglePageFormSection>
          <EndPageSection
            endPageParagraph={settings.endPageParagraph}
            imageUrl={settings.endPageImageFile}
          />
        </SinglePageMain>
      )}
      {settings.mode === "1" && (
        <MultiPageMain
          font={styles.font}
          backgroundImage={styles.backgroundImages[0]}
        >
          {navigatePage === 0 && (
            <StartPageSection
              title={settings.title}
              imageUrl={settings.startPageImageFile}
              startPageParagraph={settings.startPageParagraph}
              mode={settings.mode}
              setNavigatePage={setNavigatePage}
            />
          )}

          {navigatePage === 1 && (
            <MultiPageFormSection>
              <SurveyContainer>
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
                    if (
                      questionPage ===
                      questionsInDiffernetPageArr.length - 1
                    ) {
                      setNavigatePage(2);
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
                      <QuestionContainer key={i}>
                        {question.type !== "2" && (
                          <>
                            <Heading>
                              {helper.generateUserSurveyQuestionTitle(
                                indexInDifferentPageArr[questionPage][i],
                                question.title
                              )}
                            </Heading>
                            {question.validations.required && (
                              <RequireQuestionTag>必填</RequireQuestionTag>
                            )}
                            <NoteText>{question.note}</NoteText>
                          </>
                        )}
                        {generateResponsedUserSurveyQuestion(
                          question.type,
                          question
                        )}
                      </QuestionContainer>
                    );
                  })}
              </SurveyContainer>
            </MultiPageFormSection>
          )}

          {navigatePage === 2 && (
            <EndPageSection
              endPageParagraph={settings.endPageParagraph}
              imageUrl={settings.endPageImageFile}
            />
          )}
        </MultiPageMain>
      )}
    </>
  );
};

export default Survey;
