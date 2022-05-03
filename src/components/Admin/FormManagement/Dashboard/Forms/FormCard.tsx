import { FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import usePushToAnalysisPage from "../../../../../hooks/usePushToAnalysisPage";
import helper from "../../../../../utils/helper";
import FeatureButton from "./FormItemExpand/FeatureButton";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 1rem 1rem;
  width: 100%;
  border-bottom: 1px solid rgba(180, 188, 183, 0.15);
  background-color: rgba(180, 188, 183, 0.2);
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
  /* color: #646665; */
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
  background-color: #649777;
  padding: 0rem 3%;
  ${featureButtonStyleText}
  @media ${breakpointConfig.mobileL} {
    padding: 0rem 8%;
  }
`;

const featureButtonStyleTextDelete = `
background-color: #b9b9b9;
  padding: 0rem 3%;
  ${featureButtonStyleText}

  &:hover {
    color: #a04640;
    background-color: #555;
  }

  @media ${breakpointConfig.mobileL} {
    padding: 0rem 8%;
  }
`;

const featureButtonStyleTextAnalysis = `
  background-color: #649777;
  padding: 0rem 2%;
  ${featureButtonStyleText}
  @media ${breakpointConfig.mobileL} {
    padding: 0rem 4.2%;
  }
`;

const FormCard: FC<FormCardProps> = ({
  title,
  responsedTimes,
  dateCreated,
  dateResponsed,
  formId,
}) => {
  const goToAnalysisPageHandler = usePushToAnalysisPage();
  return (
    <CardContainer id={formId}>
      <FormTitle>{title}</FormTitle>
      <CardField>
        <CardColumnTitle>回應數量</CardColumnTitle>
        <CardColumnValue>{responsedTimes}</CardColumnValue>
      </CardField>
      <CardField>
        <CardColumnTitle>創建日期</CardColumnTitle>
        <CardColumnValue>
          {helper.convertDateToLocaleString(dateCreated)}
        </CardColumnValue>
      </CardField>
      <CardField>
        <CardColumnTitle>最新回應日期</CardColumnTitle>
        <CardColumnValue>
          {dateResponsed !== null
            ? helper.convertDateToLocaleString(dateCreated)
            : null}
        </CardColumnValue>
      </CardField>
      <CardField>
        <FeatureColumnTitle>基本設定</FeatureColumnTitle>
        <FeatureButton text="刪除" styleText={featureButtonStyleTextDelete} />
        <FeatureButton text="開啟" styleText={featureButtonStyleTextGeneral} />
        <FeatureButton text="預覽" styleText={featureButtonStyleTextGeneral} />
      </CardField>
      <CardField>
        <FeatureColumnTitle>修改問卷</FeatureColumnTitle>
        <FeatureButton text="編輯" styleText={featureButtonStyleTextGeneral} />
        <FeatureButton text="複製" styleText={featureButtonStyleTextGeneral} />
        <FeatureButton text="移動" styleText={featureButtonStyleTextGeneral} />
      </CardField>
      <CardField>
        <FeatureColumnTitle>數據查看</FeatureColumnTitle>
        <FeatureButton
          text="統計分析"
          styleText={featureButtonStyleTextAnalysis}
          clickHandler={() => goToAnalysisPageHandler(0, formId)}
        />
        <FeatureButton
          text="明細匯出"
          styleText={featureButtonStyleTextAnalysis}
          clickHandler={() => goToAnalysisPageHandler(1, formId)}
        />
        <FeatureButton
          text="訪問紀錄"
          styleText={featureButtonStyleTextAnalysis}
          clickHandler={() => goToAnalysisPageHandler(2, formId)}
        />
      </CardField>
    </CardContainer>
  );
};

export default FormCard;

/*
 <FeatureButton text="刪除" />
        <FeatureButton text="開啟" />
        <FeatureButton text="預覽" />
        <FeatureButton text="編輯" />
        <FeatureButton text="複製" />
        <FeatureButton text="移動" />
        <FeatureButton
          text="統計分析"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 0);
            context.setField(adminActionType.EDITING_FORM_ID, formId);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton
          text="明細匯出"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 1);
            context.setField(adminActionType.EDITING_FORM_ID, formId);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton
          text="訪問紀錄"
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, 2);
            context.setField(adminActionType.EDITING_FORM_ID, formId);
            pushRouterHandler(`/admin/analysis/${formId}`);
          }}
        />
        <FeatureButton text="建立子問卷" />

*/
