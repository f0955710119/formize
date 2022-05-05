import { FC, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";
import type { UserForm } from "../../types/userForm";
import helper from "../../utils/helper";
import questionConfig from "../../configs/questionConfig";

import styleConfig from "../../configs/styleConfig";
import PageSection from "./PageSection";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useRouter } from "next/router";
import breakpointConfig from "../../configs/breakpointConfig";
import scrollBar from "../UI/scrollBar";
import MultiplePageSection from "./MultiplePageSection";
import QuestionList from "./QuestionList";
import SinglePageSection from "./SinglePageSection";

type FormProps = UserForm;

const UserFormBodyContainerForMultiPage = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #e8e8e8;
`;

interface MainProps {
  font: string;
  backgroundImage: string;
  hasImage: boolean;
}

const SinglePageMain = styled.main<MainProps>`
  max-width: 80rem;
  width: 100%;
  height: 95vh;
  margin: 2.5vh auto 0 auto;
  border-radius: 9px;

  font-family: ${(props) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;

  overflow-y: scroll;
  ${scrollBar}

  &::-webkit-scrollbar-track {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &::-webkit-scrollbar {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: ${(props) => (props.hasImage ? props.theme.note : "")};
  }
`;

const MultiPageMain = styled.main<MainProps>`
  max-width: 80rem;
  width: 100%;
  height: 95vh;
  margin: 2.5vh auto 0 auto;
  border-radius: 9px;

  font-family: ${(props) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  overflow: hidden;
`;

const SinglePageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SinglePageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  width: 100%;
  /* height: 100vh; */
`;

const MultiPageFormSection = styled.section`
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
  ${(props: MultiPageFormQuestionButtonProps) =>
    props.isLastPage ? "left: 30%" : "right: 30%"};
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

  @media ${breakpointConfig.tabletS} {
    width: 80%;
    ${(props: MultiPageFormQuestionButtonProps) =>
      props.isLastPage
        ? "left: 0; bottom: 9rem;"
        : "right: 0;left:0; bottom: 4rem;"};
  }
`;

const FormContainer = styled.div`
  width: 100%;
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

const Form: FC<FormProps> = ({
  responseDocId,
  questions,
  settings,
  styles,
}: FormProps) => {
  const router = useRouter();
  const { formId } = router.query;
  const { answers } = useAppSelector((state) => state.user);
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

  const clickStartPageButtonHandler = () => setNavigatePage(1);

  const sendResponses = async () => {
    try {
      const response = await fetch("/api/user/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          responseDocId,
          formId,
        }),
      });

      const data = await response.json();
      if (data.status !== "success") throw new Error(data.message);
      alert("回應成功!");
      setNavigatePage(2);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {settings.mode === "0" && (
        <UserFormBodyContainerForMultiPage>
          <SinglePageMain
            hasImage={settings.startPageImageFile ? true : false}
            font={styles.font}
            backgroundImage={styles.backgroundImages[0]}
          >
            <PageSection
              isStartPage
              title={settings.title}
              imageUrl={settings.startPageImageFile}
              paragraph={settings.startPageParagraph}
              mode={settings.mode}
            />
            {/* <SinglePageFormSection>
              <SinglePageFormContainer>
                {questions.map((question, i) => {
                  return (
                    <QuestionList
                      titleIndex={indexArr[i]}
                      question={question}
                    />
                  );
                })}
              </SinglePageFormContainer>
            </SinglePageFormSection> */}
            <SinglePageSection questions={questions} />
            <PageSection
              isStartPage={false}
              paragraph={settings.endPageParagraph}
              imageUrl={settings.endPageImageFile}
            />
          </SinglePageMain>
        </UserFormBodyContainerForMultiPage>
      )}
      {settings.mode === "1" && (
        <UserFormBodyContainerForMultiPage>
          <MultiPageMain
            hasImage={settings.startPageImageFile ? true : false}
            font={styles.font}
            backgroundImage={styles.backgroundImages[0]}
          >
            {navigatePage === 0 && (
              <PageSection
                isStartPage
                title={settings.title}
                imageUrl={settings.startPageImageFile}
                paragraph={settings.startPageParagraph}
                mode={settings.mode}
                clickHandler={clickStartPageButtonHandler}
              />
            )}

            {navigatePage === 1 && (
              <MultiplePageSection
                setNavigatePage={setNavigatePage}
                settings={settings}
                questions={questions}
                sendResponses={sendResponses}
              />
            )}

            {navigatePage === 2 && (
              <PageSection
                isStartPage={false}
                paragraph={settings.endPageParagraph}
                imageUrl={settings.endPageImageFile}
              />
            )}
          </MultiPageMain>
        </UserFormBodyContainerForMultiPage>
      )}
    </>
  );
};

export default Form;
