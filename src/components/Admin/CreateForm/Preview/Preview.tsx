import { FC } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import styled from "styled-components";
import QuestionField from "./QuestionField";

import Layout from "../UI/Layout";
import helper from "../../../../utils/helper";

interface PreviewLayoutProps {
  fontFamily: string;
  backgroundImageURL: string;
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
  align-items: center;
  width: 60%;
  padding: 0rem;
  background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url(${(props: PreviewLayoutProps) => props.backgroundImageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 70%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EditingFormPageLabel = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;

  width: 15rem;
  height: 2rem;
  border-radius: 3px;
  line-height: 2rem;

  font-size: 1.4rem;
  text-align: center;
  color: #aaa;

  background-color: rgba(255, 153, 0, 0.3);
`;

interface SwitchEditingFormPageButtonProps {
  isLeft: boolean;
}

const SwitchEditingFormPageButton = styled.div<SwitchEditingFormPageButtonProps>`
  position: absolute;
  top: 50%;
  ${(props: SwitchEditingFormPageButtonProps) =>
    props.isLeft ? "left: 2rem" : "right:2rem"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 0;
  color: #777;
  font-size: 1.2rem;
  background-color: rgba(255, 153, 0, 0.3);
  transform: translateY(-50%);
`;

const Preview: FC = () => {
  const { questions, editingFormPage } = useAppSelector(
    (state) => state.question
  );
  const { mode, pageQuantity } = useAppSelector((state) => state.setting);
  const { font, backgroundImages } = useAppSelector((state) => state.style);
  const fontTheme = helper.generateResposneThemeFontFamily(font);
  const indexArr = helper.generateQuestionIndexArr(questions);

  return (
    <PreviewLayout
      fontFamily={fontTheme}
      backgroundImageURL={backgroundImages[0]}
    >
      {mode === "1" && (
        <>
          <EditingFormPageLabel>{`第${helper.generateChineseNumberString(
            editingFormPage - 1
          )}頁`}</EditingFormPageLabel>
          {editingFormPage !== 1 && (
            <SwitchEditingFormPageButton isLeft>
              上一頁
            </SwitchEditingFormPageButton>
          )}
          {editingFormPage !== pageQuantity && (
            <SwitchEditingFormPageButton isLeft={false}>
              下一頁
            </SwitchEditingFormPageButton>
          )}
        </>
      )}
      <QuestionWrapper>
        {questions.map((question, i) => (
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
