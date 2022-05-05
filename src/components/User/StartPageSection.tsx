import { Dispatch, FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../configs/breakpointConfig";
import Logo from "../UI/Logo";
import PageCTAButton from "./PageCTAButton";
import PageParagraph from "./PageParagraph";

const StartPageContainer = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: #fff;
`;

const StartPageImageWrapper = styled.div`
  width: 100%;
  height: 55vh;

  background-image: url("/images/start-page-default.svg");
  background-image: url("/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StartPageInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 4rem 1rem 4rem;
  height: 45vh;

  @media ${breakpointConfig.tablet} {
    transform: translateY(-2rem);
  }
`;

const FormTitle = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  line-break: strict;
  color: ${(props) => props.theme.title};
  color: #555;
  margin: 2rem 0;
`;

const StartPageParagraph = styled.textarea`
  width: 100%;
  /* color: ${(props) => props.theme.note}; */
  color: ${(props) => props.theme.title};
  font-size: 1.8rem;
  line-height: 1.38;
  white-space: pre-line;
  margin: 2rem auto 4rem 0;
  border: none;
  overflow: hidden;
  resize: none;
  word-break: normal;
  text-align: justify;

  &:disabled {
    background-color: transparent;
  }
`;

const StartPageLogo = styled(Logo)`
  position: absolute;
  top: 2rem;
  left: 4rem;
  color: #fff;
`;

interface StartPageSectionProps {
  title: string;
  imageUrl: string;
  startPageParagraph: string;
  mode: string;
  setNavigatePage?: Dispatch<number>;
}

const StartPageSection: FC<StartPageSectionProps> = ({
  title,
  imageUrl,
  startPageParagraph,
  mode,
  setNavigatePage,
}: StartPageSectionProps) => {
  const clickHandler = () => {
    if (!setNavigatePage) return;
    setNavigatePage(1);
  };

  // const handledStartPageParagraph = startPageParagraph === "" ? startPageParagraph : startPageParagraph.

  return (
    <StartPageContainer>
      <StartPageImageWrapper />
      <StartPageLogo fontSize="2.4rem" />
      <StartPageInfoWrapper>
        <FormTitle>{title}</FormTitle>
        <PageParagraph
          paragraph={
            startPageParagraph === ""
              ? "我們很歡迎來到本畫面，希望您有最舒適的中文問卷填答體驗。期待收到您的回覆!按下開始鈕進行填答吧!"
              : startPageParagraph
          }
        />

        {mode === "1" && (
          <PageCTAButton text="開始" clickHandler={clickHandler} />
        )}
      </StartPageInfoWrapper>
    </StartPageContainer>
  );
};

export default StartPageSection;
