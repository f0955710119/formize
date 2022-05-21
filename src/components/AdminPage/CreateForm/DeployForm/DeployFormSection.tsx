import { useRouter } from "next/router";

import { FC, useContext } from "react";

import { TextField } from "@mui/material";
import { ShareFill } from "@styled-icons/bootstrap/ShareFill";
import styled from "styled-components";

import useAppSelector from "../../../../hooks/useAppSelector";
import Main from "../UI/Main";
import SectionHeading from "../UI/SectionHeading";
import { adminContext } from "../../../../store/context/adminContext";

const Container = styled.div`
  margin: 4rem auto;
  width: 62.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 8rem);
  animation: moveInBottom 0.3s ease-in-out;

  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(2rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 25rem;
  height: 25rem;
  margin-bottom: 1rem;
`;

const DeployDecoratorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SubHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  width: 50%;
`;

const CustomShareSharpIcon = styled(ShareFill)`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

const SubHeadingText = styled.span`
  font-size: 2.2rem;
`;

const URLWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 45.5%;
`;

const CustomTextDisableField = styled(TextField)`
  width: 100%;
  cursor: pointer;
  & .Mui-disabled {
    cursor: pointer;
    width: 100%;
  }

  & input {
    width: 100%;
    cursor: pointer;
  }
`;

const DeploySectionHeading = styled(SectionHeading)`
  border-bottom: none;
  text-align: center;
  font-size: 2.6rem;
  margin-bottom: 0rem;
`;

const goDifferentRouteLinkStyle = `
  display: block;
  width: 45%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 5px;
  background-color: #aaa;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    color:#fff;
    background-color:#555;
  }
`;

const FormBlankLink = styled.a`
  ${goDifferentRouteLinkStyle}
  margin-bottom: 1rem;
  &:link,
  &:visited {
    color: #333;
  }

  &:hover {
    color: #fff;
    background-color: #555;
  }
`;

const CopyLinkButton = styled.div`
  ${goDifferentRouteLinkStyle}
`;

const DeployFormSection: FC = () => {
  const router = useRouter();
  const { newFormId } = useContext(adminContext);

  const newFormPath = `/s/${newFormId}`;
  const webOrigin = process.env.NEXT_PUBLIC_ORIGIN;
  const newFormHref = `${webOrigin}${newFormPath}`;

  const deployDecoratorImageSrc = `${webOrigin}/images/deploy-img.svg`;
  return (
    <Main>
      <Container>
        <DeploySectionHeading>發佈成功囉~問卷已上線!</DeploySectionHeading>
        <ImageWrapper>
          <DeployDecoratorImage
            src={deployDecoratorImageSrc}
            alt="FORMiZE問卷產生工具-發佈成功"
          />
        </ImageWrapper>
        <SubHeading>
          <CustomShareSharpIcon />
          <SubHeadingText>分享問卷 ( 點擊連結前往 )</SubHeadingText>
        </SubHeading>
        <URLWrapper onClick={() => router.push(newFormPath)}>
          <CustomTextDisableField value={newFormHref} disabled />
        </URLWrapper>
        <FormBlankLink href={newFormHref} target="_blank" rel="noreferrer">
          開啟問卷分頁
        </FormBlankLink>
        <CopyLinkButton
          onClick={() => navigator.clipboard.writeText(newFormHref)}
        >
          複製問卷連結
        </CopyLinkButton>
      </Container>
    </Main>
  );
};

export default DeployFormSection;
