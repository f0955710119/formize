import { FC } from "react";
import styled from "styled-components";
import useRoutePush from "../../../../../../hooks/useRoutePush";
import FeatureButton from "./FeatureButton";

interface SurveyItemExpandContainerProps {
  isExpand: boolean;
}

const SurveyItemExpandContainer = styled.div<SurveyItemExpandContainerProps>`
  padding-left: 2rem;
  width: 100%;
  opacity: ${(props: SurveyItemExpandContainerProps) =>
    props.isExpand ? "1" : "0"};
  height: ${(props: SurveyItemExpandContainerProps) =>
    props.isExpand ? "5.2rem" : "0"};
  transition: opacity 0.1s, height 0.3s;
`;

const SurveyItemExpandFeatureList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.6rem;
`;

interface SurveyItemExpandProps {
  isExpand: boolean;
  formId: string;
}

const SurveyItemExpand: FC<SurveyItemExpandProps> = ({ isExpand, formId }) => {
  console.log(formId);
  const pushRouterHandler = useRoutePush();
  return (
    <SurveyItemExpandContainer isExpand={isExpand}>
      <SurveyItemExpandFeatureList>
        <FeatureButton text="開啟" />
        <FeatureButton text="預覽" />
        <FeatureButton text="編輯" />
        <FeatureButton text="複製" />
        <FeatureButton text="移動" />
        <FeatureButton
          text="統計分析"
          clickHandler={() => {
            pushRouterHandler(`/admin/analysis/${formId}/static`);
          }}
        />
        <FeatureButton
          text="明細匯出"
          clickHandler={() => {
            pushRouterHandler(`/admin/analysis/${formId}/export`);
          }}
        />
        <FeatureButton
          text="訪問紀錄"
          clickHandler={() => {
            pushRouterHandler(`/admin/analysis/${formId}/record`);
          }}
        />
        <FeatureButton text="建立子問卷" />
        <FeatureButton text="刪除" />
      </SurveyItemExpandFeatureList>
    </SurveyItemExpandContainer>
  );
};

export default SurveyItemExpand;
