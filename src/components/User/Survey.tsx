import { FC } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";
import type { UserSurvey } from "../../types/userSurvey";
import helper from "../../utils/helper";
import questionConfig from "../../utils/questionConfig";

import OneLineText from "./Questions/OneLineText";
import MultipleLineText from "./Questions/MultipleLineText";
import Introduction from "./Questions/Introdction";
import OneChoice from "./Questions/OneChoice";
import MultiChoice from "./Questions/MultipleChoice";
import Martix from "./Questions/Maritx";
import Slider from "./Questions/Slider";
import Sort from "./Questions/Sort";
import Date from "./Questions/Date";

type SurveyProps = UserSurvey;

interface MainProps {
  font: string;
}

const Main = styled.main<MainProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) =>
    helper.generateResponsedUserSurveyFontFamily(props.font)};

  background-image: url("/images/stacked-waves-haikei.svg");
`;

const SurveyContainer = styled.div`
  width: 96rem;
  height: 80%;
  padding: 4rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const generateResponsedUserSurveyQuestion = (
  questionType: string,
  question: Question
) => {
  switch (questionType) {
    case questionConfig.ONE_LINE_TEXT: {
      return <OneLineText textType="text" />;
    }

    case questionConfig.MULTIPLE_LINE_TEXT: {
      if (question.validations.length) {
        return <MultipleLineText maxLength={question.validations.length} />;
      }
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
      return <OneLineText textType="text" />;
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
  const indexArr = helper.generateQuestionIndexArr(questions);
  return (
    <Main font={styles.font}>
      <SurveyContainer>
        {questions.map((question, i) => {
          return (
            <QuestionContainer key={i}>
              {question.type !== "2" && (
                <>
                  <div>
                    {helper.generateUserSurveyQuestionTitle(
                      indexArr[i],
                      question.title
                    )}
                  </div>
                  <div>{question.note}</div>
                </>
              )}
              {generateResponsedUserSurveyQuestion(question.type, question)}
            </QuestionContainer>
          );
        })}
      </SurveyContainer>
    </Main>
  );
};

export default Survey;

/*

1. 用 switch 來決定要產生的對應題型 (title / note 是固定)
2. 產生後要為各種題型加上它的限制，使他真的能變成它的題型限制
3. 先把各種資料拿掉就好，demo 完再實際發送
*/
