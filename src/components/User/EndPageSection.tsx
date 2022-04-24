import { FC } from "react";
import styled from "styled-components";

const EndPageContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

const EndPageImageWrapper = styled.div`
  width: 60%;
  height: 100%;
  background-color: #fff;
`;

const EndPageImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EndPageInfoWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  height: 100%;
  background-color: #fff;
`;

const EndPageParagraph = styled.div`
  width: 80%;
  color: ${(props) => props.theme.note};
  font-size: 2rem;
  margin-bottom: 4rem;
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
      <EndPageInfoWrapper>
        <EndPageParagraph>{endPageParagraph}</EndPageParagraph>
      </EndPageInfoWrapper>
      <EndPageImageWrapper>
        <EndPageImage
          src={
            imageUrl
              ? imageUrl
              : "/images/kelly-sikkema--1_RZL8BGBM-unsplash.jpg"
          }
        />
      </EndPageImageWrapper>
    </EndPageContainer>
  );
};

export default EndPageSection;
