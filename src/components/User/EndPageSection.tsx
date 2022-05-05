import { FC } from "react";
import styled from "styled-components";
import Logo from "../UI/Logo";

const EndPageContainer = styled.section`
  display: flex;
  max-width: 90rem;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: #fff;
`;

const EndPageImageWrapper = styled.div`
  width: 100%;
  height: 55vh;

  /* background-image: url("/images/start-page-default.svg"); */
  background-image: url("/images/manuel-cosentino-M3fhZSBFoFQ-unsplash.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const EndPageImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EndPageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 4rem;
  width: 100%;
  height: 45vh;
`;

const EndPageTitle = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  line-break: strict;
  color: ${(props) => props.theme.title};
  color: #555;
  margin: 2rem 0;
`;

const EndPageParagraph = styled.div`
  /* width: 80%;
  color: ${(props) => props.theme.title};
  font-size: 2rem;
  margin-bottom: 4rem;
  text-align: center; */

  width: 100%;
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
        {/* <EndPageImage src={imageUrl ? imageUrl : "/images/side-bar-pic.svg"} /> */}
      </EndPageImageWrapper>
      <EndPageInfoWrapper>
        <EndPageTitle>您已完成本問卷的填答!</EndPageTitle>
        {/* <Logo style={{ marginBottom: "2rem" }} /> */}
        <EndPageParagraph>
          {endPageParagraph === ""
            ? "感謝你的回覆，期待這個回應帶給世界更美好的未來!"
            : endPageParagraph}
        </EndPageParagraph>
      </EndPageInfoWrapper>
    </EndPageContainer>
  );
};

export default EndPageSection;
