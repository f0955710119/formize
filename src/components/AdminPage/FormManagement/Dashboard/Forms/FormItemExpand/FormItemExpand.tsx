import Link from "next/link";

import { FC, useContext } from "react";

import styled from "styled-components";

import useDeleteForm from "../../../../../../hooks/useDeleteForm";
import usePushToAnalysisPage from "../../../../../../hooks/usePushToAnalysisPage";
import { adminContext } from "../../../../../../store/context/adminContext";
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

interface FormItemExpandFeatureListProps {
  isExpand: boolean;
}

const FormItemExpandFeatureList = styled.div<FormItemExpandFeatureListProps>`
  display: ${(props) => (!props.isExpand ? "none" : "flex")};
  align-items: center;
  width: 100%;
  height: 3rem;
`;

interface FormItemExpandProps {
  isExpand: boolean;
  formId: string;
}

const FormItemExpand: FC<FormItemExpandProps> = ({ isExpand, formId }) => {
  const adminContextData = useContext(adminContext);
  const goToAnalysisPageHandler = usePushToAnalysisPage();
  const deleteFormHandler = useDeleteForm();
  const willDeleteForm =
    adminContextData.forms.length > 0
      ? adminContextData.forms.find((form) => form.id === formId)
      : undefined;
  const deleteFormTitle = willDeleteForm ? willDeleteForm.title : "";
  return (
    <FormItemExpandContainer isExpand={isExpand}>
      <FormItemExpandFeatureList isExpand={isExpand}>
        <FeatureButton
          text="刪除"
          clickHandler={() => deleteFormHandler(formId, deleteFormTitle)}
        />
        <a href={`/s/${formId}`} target="_blank" rel="noreferrer">
          <FeatureButton text="開啟" />
        </a>
        <FeatureButton
          text="統計分析"
          clickHandler={() => goToAnalysisPageHandler(0, formId)}
        />
      </FormItemExpandFeatureList>
    </FormItemExpandContainer>
  );
};

export default FormItemExpand;
