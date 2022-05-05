import { StringLike } from "@firebase/util";
import { FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../configs/breakpointConfig";

import Logo from "../UI/Logo";
import PageCTAButton from "./PageCTAButton";
import PageParagraph from "./PageParagraph";

const PageContainer = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: #fff;
`;

interface PageImageWrapperProps {
  img: string;
}

const PageImageWrapper = styled.div<PageImageWrapperProps>`
  width: 100%;
  height: 55vh;
  ${(props: PageImageWrapperProps) => `background-image: url(${props.img});`}
  /* background-image: url("/images/start-page-default.svg");
  background-image: url("/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg"); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const PageInfoWrapper = styled.div`
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

const PageLogo = styled(Logo)`
  position: absolute;
  top: 2rem;
  left: 4rem;
  color: #fff;
`;

const defaultStartPageParagraph =
  "我們很歡迎來到本畫面，希望您有最舒適的中文問卷填答體驗。期待收到您的回覆!按下開始鈕進行填答吧!";
const defaultEndPageTitle = "您已完成本問卷的填答!";
const defaultEndPageParagraph = "感謝你的填答，我們會好好保存您的回覆!";

interface PageSectionProps {
  isStartPage: boolean;
  clickHandler?: () => void;
  mode?: string;
  title?: string;
  imageUrl?: string | null;
  paragraph?: string;
}

const PageSection: FC<PageSectionProps> = ({
  isStartPage,
  title,
  mode,
  clickHandler,
  imageUrl,
  paragraph,
}) => {
  return (
    <PageContainer>
      {isStartPage && (
        <PageImageWrapper
          img={imageUrl ? imageUrl : "/images/start-page-default.svg"}
        />
      )}
      {!isStartPage && (
        <PageImageWrapper
          img={imageUrl ? imageUrl : "/images/side-bar-pic.svg"}
        />
      )}
      <PageInfoWrapper>
        <FormTitle>{isStartPage ? title : defaultEndPageTitle}</FormTitle>
        {isStartPage && (
          <PageParagraph
            paragraph={paragraph ? paragraph : defaultStartPageParagraph}
          />
        )}
        {!isStartPage && (
          <PageParagraph
            paragraph={paragraph ? paragraph : defaultEndPageParagraph}
          />
        )}
        {mode === "1" && isStartPage && (
          <PageCTAButton text="開始" clickHandler={clickHandler} />
        )}

        {!isStartPage && (
          <a href="/" target="_blank">
            <PageCTAButton
              text="製作第一份專屬問卷"
              clickHandler={clickHandler}
            />
          </a>
        )}
      </PageInfoWrapper>
    </PageContainer>
  );
};

export default PageSection;
