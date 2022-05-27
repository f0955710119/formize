import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../../../configs/breakpointConfig";
import useDeleteForm from "../../../../../../hooks/useDeleteForm";
import usePushToAnalysisPage from "../../../../../../hooks/usePushToAnalysisPage";
import { adminContext } from "../../../../../../store/context/adminContext";
import helper from "../../../../../../utils/helper";
import FeatureButton from "../FormItemExpand/FeatureButton";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 1rem 1rem;
  width: 100%;
  border-bottom: 1px solid rgba(180, 188, 183, 0.15);
  background-color: #fdd87238;
`;

const FormTitle = styled.div`
  margin-bottom: 1rem;
  padding: 0.4rem 0;
  font-size: 2rem;
`;

const CardField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.2rem 0;
`;

const CardColumnTitle = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  width: 10rem;
  color: #646665;
`;

const FeatureColumnTitle = styled(CardColumnTitle)`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 6.5rem;
    bottom: 0.28rem;
    height: 68%;
    width: 0.3rem;
    background-color: #828382;
  }

  @media ${breakpointConfig.mobileL} {
    display: none;
  }
`;

const CardColumnValue = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  width: calc(100% - 10rem);
`;

interface FormCardProps {
  title: string;
  responsedTimes: number;
  dateCreated: Date;
  dateResponsed: Date | null;
  formId: string;
}

const featureButtonStyleText = `
  color: #fff;
  margin-right: 0.5rem;
`;

const featureButtonStyleTextGeneral = `
  background-color: #c9ab59;
  ${featureButtonStyleText}
  padding: 0rem 3%;
  @media ${breakpointConfig.mobileL} {
    padding: 0rem 8%;
  }
`;

const featureButtonStyleTextDelete = `
background-color: #b9b9b9;
${featureButtonStyleText}
  padding: 0rem 3%;
  &:hover {
    color: #a04640;
    background-color: #555;
  }

  @media ${breakpointConfig.mobileL} {
    padding: 0rem 8%;
  }
`;

const featureButtonStyleTextAnalysis = `
  background-color: #c9ab59;
  padding: 0rem 2%;
  ${featureButtonStyleText}
  @media ${breakpointConfig.mobileL} {
    padding: 0rem 4.2%;
  }
`;

const FeatureLink = styled.a`
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  ${featureButtonStyleTextGeneral}
  transition: background-color 0.3s ease-in-out;

  & button {
    margin-right: 0;
    padding: 0;
    color: #fff;
    background-color: transparent;
  }

  & button:hover {
    background-color: transparent;
  }

  &:hover {
    background-color: #555;
  }
`;

const FormCard: FC<FormCardProps> = ({
  title,
  responsedTimes,
  dateCreated,
  dateResponsed,
  formId,
}) => {
  const adminContextData = useContext(adminContext);
  const goToAnalysisPageHandler = usePushToAnalysisPage();
  const deleteFormHandler = useDeleteForm();
  const willDeleteForm =
    adminContextData.forms.length > 0
      ? adminContextData.forms.find((form) => form.id === formId)
      : undefined;
  const deleteFormTitle = willDeleteForm ? willDeleteForm.title : "";
  return (
    <CardContainer id={formId}>
      <FormTitle>{title}</FormTitle>
      <CardField>
        <CardColumnTitle>回應數量</CardColumnTitle>
        <CardColumnValue>{responsedTimes}</CardColumnValue>
      </CardField>
      <CardField>
        <CardColumnTitle>創建日期</CardColumnTitle>
        <CardColumnValue>{helper.convertDateToLocaleString(dateCreated)}</CardColumnValue>
      </CardField>
      <CardField>
        <CardColumnTitle>最新回應日期</CardColumnTitle>
        <CardColumnValue>
          {dateResponsed !== null ? helper.convertDateToLocaleString(dateCreated) : null}
        </CardColumnValue>
      </CardField>
      <CardField>
        <FeatureColumnTitle>基本設定</FeatureColumnTitle>
        <FeatureButton
          text="刪除"
          styleText={featureButtonStyleTextDelete}
          clickHandler={() => deleteFormHandler(formId, deleteFormTitle)}
        />
        <FeatureLink href={`/s/${formId}`} target="_blank" rel="noreferrer">
          <FeatureButton text="開啟" />
        </FeatureLink>
      </CardField>
      <CardField>
        <FeatureColumnTitle>數據查看</FeatureColumnTitle>
        <FeatureButton
          text="統計分析"
          styleText={featureButtonStyleTextAnalysis}
          clickHandler={() => goToAnalysisPageHandler(0, formId)}
        />
      </CardField>
    </CardContainer>
  );
};

export default FormCard;
