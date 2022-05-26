import { useRouter } from "next/router";

import { FC, useState } from "react";

import styled from "styled-components";

import breakpointConfig from "../../configs/breakpointConfig";
import styleConfig from "../../configs/styleConfig";
import useAppSelector from "../../hooks/useAppSelector";
import type { UserForm } from "../../types/userForm";
import sweetAlert from "../../utils/sweetAlert";
import scrollBar from "../UI/scrollBar";
import MultiplePageSection from "./MultiplePageSection";
import PageSection from "./PageSection";
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

const PageMain = styled.main<MainProps>`
  max-width: 80rem;
  width: 100%;
  height: 95vh;
  margin: 2.5vh auto 0 auto;
  border-radius: 9px;

  font-family: ${(props) => props.font};

  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;

  @media ${breakpointConfig.deployForm} {
    max-width: auto;
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
`;

const SinglePageMain = styled(PageMain)`
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

const MultiPageMain = styled(PageMain)`
  overflow: hidden;
`;

const Form: FC<FormProps> = ({ responseDocId, questions, settings, style }: FormProps) => {
  const router = useRouter();
  const { formId } = router.query;
  const { answers } = useAppSelector((state) => state.user);
  const [navigatePage, setNavigatePage] = useState<number>(0);
  const clickStartPageButtonHandler = () => setNavigatePage(1);

  const {
    mode,
    title,
    startPageParagraph,
    startPageImageFile,
    endPageParagraph,
    endPageImageFile,
  } = settings;

  const sendResponses = async () => {
    sweetAlert.loadingReminderAlert("發送回應...");
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
      sweetAlert.loadedReminderAlert("回應成功!");
      setTimeout(() => {
        sweetAlert.closeAlert();
      }, 1500);
      setNavigatePage(2);
    } catch (error) {
      console.error(error);
    }
  };

  const fontCodeName = styleConfig[`${style.font}_KEYFONT`];
  const font = styleConfig[`${fontCodeName}_CSS`];

  const DynamicPageMain = mode === "0" ? SinglePageMain : MultiPageMain;
  const startPageProps = {
    isStartPage: true,
    title,
    imageUrl: startPageImageFile,
    paragraph: startPageParagraph,
    mode,
  };
  const endPageProps = {
    isStartPage: false,
    imageUrl: endPageImageFile,
    paragraph: endPageParagraph,
  };
  return (
    <UserFormBodyContainerForMultiPage>
      <DynamicPageMain
        hasImage={startPageImageFile ? true : false}
        font={font}
        backgroundImage={style.backgroundImage}
      >
        {mode === "0" ? (
          <>
            {navigatePage === 0 ? (
              <>
                <PageSection {...startPageProps} />
                <SinglePageSection questions={questions} sendResponses={sendResponses} />
              </>
            ) : (
              <PageSection {...endPageProps} />
            )}
          </>
        ) : (
          <>
            {navigatePage === 0 && (
              <PageSection {...startPageProps} clickHandler={clickStartPageButtonHandler} />
            )}

            {navigatePage === 1 && (
              <MultiplePageSection
                setNavigatePage={setNavigatePage}
                settings={settings}
                questions={questions}
                sendResponses={sendResponses}
              />
            )}

            {navigatePage === 2 && <PageSection {...endPageProps} />}
          </>
        )}
      </DynamicPageMain>
    </UserFormBodyContainerForMultiPage>
  );
};

export default Form;
