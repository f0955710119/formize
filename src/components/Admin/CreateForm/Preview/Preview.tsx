import { FC } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import styled from "styled-components";
import QuestionField from "./QuestionField";

import Layout from "../UI/Layout";
import helper from "../../../../utils/helper";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";

interface PreviewLayoutProps {
  fontFamily: string;
  // backgroundImageURL: string;
}

const PreviewLayout = styled(Layout)<PreviewLayoutProps>`
  @font-face {
    font-family: "jfOpenhuninn";
    src: url("/fonts/jf-openhuninn-1.1.ttf") format("truetype");
  }
  @font-face {
    font-family: "hanaMinA";
    src: url("/fonts/HanaMinA.ttf") format("truetype");
  }
  @font-face {
    font-family: "taipeiSansTCBold";
    src: url("/fonts/TaipeiSansTCBeta-Bold.ttf") format("truetype");
  }

  font-family: ${(props: PreviewLayoutProps) => props.fontFamily};

  position: relative;

  display: flex;
  justify-content: center;
  width: 64%;
  height: 100%;
  padding: 0rem;
  background-color: #f8f8f8;
`;

const formWidth = Math.round((window.innerHeight / 4) * 3);
interface QuestionWrapperProps {
  backgroundImageURL: string;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${formWidth}px;
  height: 100%;
  padding: 2rem 4rem;
  background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    url(${(props: QuestionWrapperProps) => props.backgroundImageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
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
  const { questions, editingFormPage } = useAppSelector(
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

  // const switchEditingPageHandler = (page: number) => {
  //   dispatch(questionActions.switchEditingFormPage(page));
  //   dispatch(questionActions.switchEditingQuestion(null));
  // };

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
      <QuestionWrapper backgroundImageURL={backgroundImages[0]}>
        {mode === "1"
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
            ))}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
