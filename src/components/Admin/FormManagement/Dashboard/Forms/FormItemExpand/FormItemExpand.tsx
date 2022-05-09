import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import useDeleteForm from "../../../../../../hooks/useDeleteForm";
import usePushToAnalysisPage from "../../../../../../hooks/usePushToAnalysisPage";
import FeatureButton from "./FeatureButton";

interface FormItemExpandContainerProps {
  isExpand: boolean;
}

const FormItemExpandContainer = styled.div<FormItemExpandContainerProps>`
  padding-left: 2.6rem;
  width: 100%;
  opacity: ${(props: FormItemExpandContainerProps) =>
    props.isExpand ? "1" : "0"};
  height: ${(props: FormItemExpandContainerProps) =>
    props.isExpand ? "4.6rem" : "0"};
  transition: opacity 0.1s, height 0.3s;
`;

const FormItemExpandFeatureList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
`;

interface FormItemExpandProps {
  isExpand: boolean;
  formId: string;
}

const FormItemExpand: FC<FormItemExpandProps> = ({ isExpand, formId }) => {
  const goToAnalysisPageHandler = usePushToAnalysisPage();
  const deleteFormHandler = useDeleteForm();

  return (
    <FormItemExpandContainer isExpand={isExpand}>
      <FormItemExpandFeatureList>
        <FeatureButton
          text="刪除"
          clickHandler={() => deleteFormHandler(formId)}
        />
        <a href={`/s/${formId}`} target="_blank" rel="noreferrer">
          <FeatureButton text="開啟" />
        </a>
        <FeatureButton text="預覽" />
        {/* <FeatureButton text="編輯" />
        <FeatureButton text="複製" />
        <FeatureButton text="移動" /> */}
        <FeatureButton
          text="統計分析"
          clickHandler={() => goToAnalysisPageHandler(0, formId)}
        />
        {/* <FeatureButton
          text="明細匯出"
          clickHandler={() => goToAnalysisPageHandler(1, formId)}
        />
        <FeatureButton
          text="訪問紀錄"
          clickHandler={() => goToAnalysisPageHandler(2, formId)}
        /> */}
        {/* <FeatureButton text="建立子問卷" /> */}
      </FormItemExpandFeatureList>
    </FormItemExpandContainer>
  );
};

export default FormItemExpand;
