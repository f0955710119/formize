import { FC, useContext, useEffect, useState } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";
import useAppSelector from "../../../../hooks/useAppSelector";
import { settingContext } from "../../../../store/context/settingContext";
import { styleContext } from "../../../../store/context/styleContext";
import helper from "../../../../utils/helper";
import QuestionList from "../../../Questions/QuestionList";
import scrollBar from "../../../UI/scrollBar";
import Layout from "../UI/Layout";
import QuestionField from "./QuestionField";

interface PreviewLayoutProps {
  fontFamily: string;
}

const PreviewLayout = styled(Layout)<PreviewLayoutProps>`
  font-family: ${(props: PreviewLayoutProps) => props.fontFamily};

  position: relative;

  display: flex;
  justify-content: center;
  width: 62%;
  height: 100%;
  padding: 2rem 0rem;
  background-color: #f8f8f8;

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    height: calc(100vh - 6rem);
    order: 1;
    background-color: #fff;
  }

  @media ${breakpointConfig.tabletL} {
    padding: 2rem 1rem;
  }
`;

interface QuestionWrapperProps {
  hasQuestion: boolean;
  backgroundImageURL: string;
  width: string;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
  height: 100%;
  padding: 2rem 4rem;
  border-radius: 7px;

  ${(props) => `background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),url(${props.hasQuestion ? props.backgroundImageURL : ""})`};

  background-size: cover;
  background-repeat: no-repeat;

  ${(props) => (props.hasQuestion ? `overflow-y: scroll;${scrollBar}` : "")}

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.title};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 0.8rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  @media ${breakpointConfig.tablet} {
    width: 100%;
  }
`;

const NoQuestionReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 50rem;
  margin: auto 0;
  border-radius: 9px;
  background-image: url("/images/form-preview-default.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 70%;

  @media ${breakpointConfig.desktopS} {
    background-size: 80%;
  }
`;

const NoQuestionReminderText = styled.div`
  font-size: 1.8rem;
  font-family: jfOpenhuninn;
  text-align: center;
  color: #777;
  transform: translateY(-14rem);

  @media ${breakpointConfig.desktopS} {
    font-size: 1.6rem;
    transform: translateY(-10rem);
  }
`;

const Preview: FC = () => {
  const { mode, pageQuantity } = useContext(settingContext);
  const { font, backgroundImage } = useContext(styleContext);
  const [width, setWidth] = useState<string>("");
  const [reminderText, setReminderText] =
    useState<string>("尚無題目，點擊右欄題目來創建題型吧!");
  const { questions, editingFormPage, currentStep } = useAppSelector(
    (state) => state.question
  );

  const fontTheme = helper.generateResposneThemeFontFamily(font);
  const indexArr = helper.generateQuestionIndexArr(questions);
  const multiPageQuestionIndexArr = helper.generateQuestionMultiPageIndexArr(
    pageQuantity,
    questions
  );

  useEffect(() => {
    const widthFromWindow = Math.round((window.innerHeight / 4) * 3);
    setWidth(`${widthFromWindow}px`);

    if (window.innerWidth > 1240) return;
    setReminderText("尚無題目!下滑至題目欄，點擊新增符號來創建題型吧!");
  }, []);

  const hasQuestions = questions.length > 0;

  const editingQuestions =
    mode === "1"
      ? questions
          .filter((question) => question.page === editingFormPage)
          .map((question, i) => (
            <QuestionField
              question={question}
              key={question.id}
              titleIndex={multiPageQuestionIndexArr[editingFormPage - 1][i]}
            />
          ))
      : questions.map((question, i) => (
          <QuestionField
            question={question}
            key={question.id}
            titleIndex={indexArr[i]}
          />
        ));

  const stylingQuestions =
    mode === "1"
      ? questions
          .filter((question) => question.page === editingFormPage)
          .map((question, i) => (
            <QuestionList
              key={question.id}
              titleIndex={multiPageQuestionIndexArr[editingFormPage - 1][i]}
              question={question}
              isCreatingProcess
            />
          ))
      : questions.map((question, i) => (
          <QuestionList
            key={question.id}
            titleIndex={indexArr[i]}
            question={question}
            isCreatingProcess
          />
        ));

  const previewQuestions =
    currentStep === 2 ? editingQuestions : stylingQuestions;

  return (
    <PreviewLayout fontFamily={fontTheme}>
      <QuestionWrapper
        backgroundImageURL={backgroundImage}
        hasQuestion={hasQuestions}
        width={width}
      >
        {hasQuestions ? (
          previewQuestions
        ) : (
          <NoQuestionReminder>
            <NoQuestionReminderText>{reminderText}</NoQuestionReminderText>
          </NoQuestionReminder>
        )}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
