import { FC, useState } from "react";
import styled from "styled-components";
import type { UserForm } from "../../types/userForm";

import styleConfig from "../../configs/styleConfig";
import PageSection from "./PageSection";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useRouter } from "next/router";

import scrollBar from "../UI/scrollBar";
import MultiplePageSection from "./MultiplePageSection";
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
  // const [questionPage, setQuestionPage] = useState<number>(0);

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
            {navigatePage === 0 ? (
              <>
                {" "}
                <PageSection
                  isStartPage
                  title={settings.title}
                  imageUrl={settings.startPageImageFile}
                  paragraph={settings.startPageParagraph}
                  mode={settings.mode}
                />
                <SinglePageSection
                  questions={questions}
                  sendResponses={sendResponses}
                />
              </>
            ) : (
              <PageSection
                isStartPage={false}
                paragraph={settings.endPageParagraph}
                imageUrl={settings.endPageImageFile}
              />
            )}
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
