import { Dispatch, FC } from "react";
import styled from "styled-components";

const StartPageContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StartPageImageWrapper = styled.div`
  width: 60%;
  height: 100%;
`;

const StartPageImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StartPageInfoWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  height: 100%;
  background-color: #fff;
`;

const FormTitle = styled.div`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
  line-break: strict;
  color: ${(props) => props.theme.title};
`;

const StartPageParagraph = styled.div`
  width: 80%;
  color: ${(props) => props.theme.note};
  font-size: 2rem;
  margin-bottom: 4rem;
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
        <StartPageImage src={imageUrl} />
      </StartPageImageWrapper>
      <StartPageInfoWrapper>
        <FormTitle>{title}</FormTitle>
        <StartPageParagraph>{startPageParagraph}</StartPageParagraph>
        {mode === "1" && <div onClick={clickHandler}>下一頁</div>}
      </StartPageInfoWrapper>
    </StartPageContainer>
  );
};

export default StartPageSection;
