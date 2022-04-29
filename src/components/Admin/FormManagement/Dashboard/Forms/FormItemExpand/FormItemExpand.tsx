import { FC, useContext } from "react";
import styled from "styled-components";
import useRoutePush from "../../../../../../hooks/useRoutePush";
import adminActionType from "../../../../../../store/actionType/adminActionType";
import { adminContext } from "../../../../../../store/context/adminContext";
import FeatureButton from "./FeatureButton";

interface FormItemExpandContainerProps {
  isExpand: boolean;
}

const FormItemExpandContainer = styled.div<FormItemExpandContainerProps>`
  padding-left: 2rem;
  width: 100%;
  opacity: ${(props: FormItemExpandContainerProps) =>
    props.isExpand ? "1" : "0"};
  height: ${(props: FormItemExpandContainerProps) =>
    props.isExpand ? "5.2rem" : "0"};
  transition: opacity 0.1s, height 0.3s;
`;

const FormItemExpandFeatureList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.6rem;
`;

interface FormItemExpandProps {
  isExpand: boolean;
  formId: string;
}

const FormItemExpand: FC<FormItemExpandProps> = ({ isExpand, formId }) => {
  const context = useContext(adminContext);
  const pushRouterHandler = useRoutePush();
  return (
    <FormItemExpandContainer isExpand={isExpand}>
      <FormItemExpandFeatureList>
        <FeatureButton text="開啟" />
        <FeatureButton text="預覽" />
        <FeatureButton text="編輯" />
        <FeatureButton text="複製" />
        <FeatureButton text="移動" />
        <FeatureButton
          text="統計分析"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 0);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton
          text="明細匯出"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 1);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton
          text="訪問紀錄"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 2);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton text="建立子問卷" />
        <FeatureButton text="刪除" />
      </FormItemExpandFeatureList>
    </FormItemExpandContainer>
  );
};

export default FormItemExpand;
