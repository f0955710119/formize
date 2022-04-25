import { FC } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import styled from "styled-components";
import { TextField } from "@mui/material";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import FolderCopySharpIcon from "@mui/icons-material/FolderCopySharp";
import Main from "../UI/Main";
import SectionHeading from "../UI/SectionHeading";
import Button from "../UI/Button";

import helper from "../../../../utils/helper";

const Container = styled.div`
  margin: 4rem auto;
  width: 62.6rem;
  display: flex;
  flex-direction: column;
`;

const SubHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const CustomShareSharpIcon = styled(ShareSharpIcon)`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

const CustomFolderCopySharpIcon = styled(FolderCopySharpIcon)`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

const SubHeadingText = styled.span`
  font-size: 2rem;
`;

const URLWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;
`;

const CustomTextDisableField = styled(TextField)`
  width: 100%;
  cursor: pointer;
  & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled {
    cursor: pointer;
    width: 100%;
  }

  & input {
    width: 100%;
    cursor: pointer;
  }
`;

const DeployFormSection: FC = () => {
  const router = useRouter();
  const surveyId = useAppSelector((state) => state.admin.newSurveyId);
  const newSurveyPath = `/s/${surveyId}`;
  const newSurveyHref = `${window.location.origin}${newSurveyPath}`;
  return (
    <Main>
      <Container>
        <SectionHeading>發佈成功囉~問卷已上線!</SectionHeading>
        <SubHeading>
          <CustomShareSharpIcon />
          <SubHeadingText>分享問卷 ( 點擊連結前往 )</SubHeadingText>
        </SubHeading>
        <URLWrapper onClick={() => router.push(newSurveyPath)}>
          <CustomTextDisableField
            defaultValue={newSurveyHref}
            disabled
            sx={{}}
            onClick={() => {
              navigator.clipboard.writeText(newSurveyHref);
            }}
          />
        </URLWrapper>
        <SubHeading>
          <CustomFolderCopySharpIcon />
          <SubHeadingText>問卷結果</SubHeadingText>
        </SubHeading>
        <Button
          clickHandler={() => {
            router.push(`/admin/analysis/${surveyId}/`);
          }}
        >
          統計分析
        </Button>
        <Button
          clickHandler={() => {
            router.push(`/admin/analysis/${surveyId}/export`);
          }}
        >
          明細匯出
        </Button>
        <Button
          clickHandler={() => {
            router.push(`/admin/analysis/${surveyId}/record`);
          }}
        >
          訪問紀錄
        </Button>
      </Container>
    </Main>
  );
};

export default DeployFormSection;
