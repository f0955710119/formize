import { FC } from "react";
import styled from "styled-components";
import Logo from "../UI/Logo";

const EndPageContainer = styled.section`
  display: flex;
  max-width: 90rem;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: #eaf9f3;
`;

const EndPageImageWrapper = styled.div`
  width: 100%;
  height: 65vh;
  /* background-color: #fff; */
`;

const EndPageImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EndPageInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  height: 35vh;
  /* background-color: #fff; */
`;

const EndPageParagraph = styled.div`
  width: 80%;
  color: ${(props) => props.theme.title};
  font-size: 2rem;
  margin-bottom: 4rem;
  text-align: center;
`;

interface EndPageSectionProps {
  imageUrl: string;
  endPageParagraph: string;
}

const EndPageSection: FC<EndPageSectionProps> = ({
  imageUrl,
  endPageParagraph,
}: EndPageSectionProps) => {
  return (
    <EndPageContainer>
      <EndPageImageWrapper>
        <EndPageImage src={imageUrl ? imageUrl : "/images/side-bar-pic.svg"} />
      </EndPageImageWrapper>
      <EndPageInfoWrapper>
        <Logo style={{ marginBottom: "2rem" }} />
        <EndPageParagraph>
          {endPageParagraph === "" ? "感謝你的填答!" : endPageParagraph}
        </EndPageParagraph>
      </EndPageInfoWrapper>
    </EndPageContainer>
  );
};

export default EndPageSection;
