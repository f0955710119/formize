import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import styled from "styled-components";
import QuestionField from "./QuestionField";

import Layout from "../UI/Layout";
import helper from "../../../../utils/helper";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";

import breakpointConfig from "../../../../configs/breakpointConfig";
import QuestionList from "../../../User/QuestionList";

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
  padding: 0rem;
  background-color: #f8f8f8;

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    height: calc(100vh - 6rem);
    order: 1;
    background-color: #fff;
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
  /* width: ${(props: QuestionWrapperProps) => props.width}; */
  width: 80rem;
  height: 100%;
  padding: 2rem 4rem;
  ${(props: QuestionWrapperProps) => `background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),url(${props.hasQuestion ? props.backgroundImageURL : ""})`};

  background-size: cover;
  background-repeat: no-repeat;

  overflow-y: scroll;

  @media ${breakpointConfig.tablet} {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
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
`;

const NoQuestionReminderText = styled.div`
  font-size: 1.6rem;
  transform: translateY(-10rem);
  text-align: center;
  color: #777;
`;

const EditingFormPageLabel = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;

  width: 15rem;
  height: 2rem;
  border-radius: 3px;
  line-height: 2rem;

  font-size: 2rem;
  text-align: center;
  color: #aaa;
  transform: translateX(-60%);
`;

interface SwitchEditingFormPageButtonProps {
  isLeft: boolean;
}

const SwitchEditingFormPageButton = styled.div<SwitchEditingFormPageButtonProps>`
  position: absolute;
  top: 5rem;
  ${(props: SwitchEditingFormPageButtonProps) =>
    props.isLeft ? "top: 3.1rem" : "top: 3rem"};
  ${(props: SwitchEditingFormPageButtonProps) =>
    props.isLeft ? "left: 40%" : "right:42.8%"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 1.8rem;

  transform: translateY(-50%);
`;

const Preview: FC = () => {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState<string>("");
  const [reminderText, setReminderText] = useState<string>(
    "尚無題目，點擊右欄題目的新增符號來創建題型吧!"
  );
  const { questions, editingFormPage, currentStep } = useAppSelector(
    (state) => state.question
  );
  const { mode, pageQuantity } = useAppSelector((state) => state.setting);
  const { font, backgroundImages } = useAppSelector((state) => state.style);
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

  // const switchEditingPageHandler = (page: number) => {
  //   dispatch(questionActions.switchEditingFormPage(page));
  //   dispatch(questionActions.switchEditingQuestion(null));
  // };

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
      {/* {mode === "1" && (
        <>
          <EditingFormPageLabel>{`第${helper.generateChineseNumberString(
            editingFormPage - 1
          )}頁`}</EditingFormPageLabel>
          {editingFormPage !== 1 && (
            <SwitchEditingFormPageButton
              isLeft
              onClick={() => {
                switchEditingPageHandler(editingFormPage - 1);
              }}
            >
              上一頁
            </SwitchEditingFormPageButton>
          )}
          {editingFormPage !== pageQuantity && (
            <SwitchEditingFormPageButton
              isLeft={false}
              onClick={() => {
                switchEditingPageHandler(editingFormPage + 1);
              }}
            >
              下一頁
            </SwitchEditingFormPageButton>
          )}
        </>
      )} */}
      <QuestionWrapper
        backgroundImageURL={backgroundImages[0]}
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
