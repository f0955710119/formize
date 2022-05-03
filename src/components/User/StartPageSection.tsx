import { Dispatch, FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../configs/breakpointConfig";
import Logo from "../UI/Logo";

const StartPageContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: #eaf9f3;
`;

const StartPageImageWrapper = styled.div`
  width: 100%;
  height: 65vh;

  /* @media ${breakpointConfig.tablet} {
    height: 120%;
  } ; */
`;

const StartPageImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StartPageInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 35vh;

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
  margin-bottom: 2rem;
`;

const StartPageParagraph = styled.div`
  width: 70%;
  /* color: ${(props) => props.theme.note}; */
  color: ${(props) => props.theme.title};
  font-size: 2rem;
  text-align: center;
  line-break: strict;
  word-wrap: break-word;
  margin: 0 auto 2rem auto;
`;

const StartAnswerButton = styled.button`
  width: 12rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 5px;
  text-align: center;
  background-color: #5d6b65;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #374941;
  }
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

  return (
    <StartPageContainer>
      <StartPageImageWrapper>
        <StartPageImage
          src={imageUrl ? imageUrl : "/images/start-page-default.svg"}
        />
      </StartPageImageWrapper>
      <StartPageInfoWrapper>
        <Logo fontSize="4rem" />
        <FormTitle>{title}</FormTitle>
        <StartPageParagraph>
          {startPageParagraph === ""
            ? "歡迎來到本問卷，按下開始鈕進行填答吧!"
            : startPageParagraph}
        </StartPageParagraph>
        {mode === "1" && (
          <StartAnswerButton type="button" onClick={clickHandler}>
            開始
          </StartAnswerButton>
        )}
      </StartPageInfoWrapper>
    </StartPageContainer>
  );
};

export default StartPageSection;
