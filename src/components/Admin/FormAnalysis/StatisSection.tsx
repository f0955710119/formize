import { FC, useContext, useRef } from "react";
import styled from "styled-components";
import { adminContext } from "../../../store/context/adminContext";
import Logo from "../../UI/Logo";

import type { StatisResponse } from "../../../types/statis";
import StatisResponseItem from "./StatisResponseItem";
import scrollBar from "../../UI/scrollBar";
import breakpointConfig from "../../../configs/breakpointConfig";
import adminActionType from "../../../store/actionType/adminActionType";
import questionConfig from "../../../configs/questionConfig";

const hasDataBackgroundStyle = `
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("/images/dashboard-background.svg");
  background-size: cover;
`;

const hasNoDataBackgroundStyle = `
  position:relative;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),url("/images/analysis-default.svg");
  background-size: cover;
  background-size: 35%;
  background-position: 50% 40%;
  filter: grayscale(100%);

  &::after {
    content:'因為該問卷尚無回應，所以\\a還看不到統計資料唷!';
    position: absolute;
    top:70%;
    left:50%;
    width:100%;
    font-size:1.8rem;
    text-align:center;
    white-space: pre-line;
    color:#777;
    transform:translate(-50%,0);
  }
  
  &::before {
    content:'';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url("/images/main-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity:0.2;
  }

  @media ${breakpointConfig.laptopL} {
    background-size: 50%;
  }

  @media ${breakpointConfig.tablet} {
    background-size: 60%;
  }

  @media ${breakpointConfig.tabletS} {
    background-size: 70%;
  }

  @media ${breakpointConfig.mobileL} {
    background-size: 80%;
  }
`;

interface StatisSectionContainerProps {
  hasData: boolean;
}

const StatisSectionContainer = styled.section<StatisSectionContainerProps>`
  padding: 2rem 2.5rem 0 3.5rem;
  width: calc(100% - 23rem);
  height: 100%;
  background-repeat: no-repeat;

  ${(props: StatisSectionContainerProps) =>
    props.hasData ? hasDataBackgroundStyle : hasNoDataBackgroundStyle}

  overflow-y: scroll;
  ${scrollBar}
  @media ${breakpointConfig.tablet} {
    width: 100%;
  }
  @media ${breakpointConfig.mobileL} {
    padding: 2rem 1rem 0 1rem;
  }
`;

const StatisSectionHeadingPesudoElement = `
  content: "";
  position: absolute;
  width: 100%;
  height: 6px;
  background-color: #b4bcb747;
  border-radius: 3px;
`;

const StatisSectionHeading = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2.8rem;
  font-size: 2.2rem;
  z-index: 1;

  &::after {
    ${StatisSectionHeadingPesudoElement}
    bottom: 0.4rem;
    left: 1rem;
  }

  &::before {
    ${StatisSectionHeadingPesudoElement}
    bottom: -0.6rem;
    left: -0.4rem;
  }

  @media ${breakpointConfig.tablet} {
    display: none;
  }
`;

const StatisHeaderForNonDesktop = styled.div`
  display: none;
  @media ${breakpointConfig.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4rem;
    margin-bottom: 1.6rem;
  }
`;

const StatisSectionHeadingForNonDesktop = styled(StatisSectionHeading)`
  @media ${breakpointConfig.tablet} {
    display: inline-block;
    margin-bottom: 0rem;
  }
`;

interface StatisHeaderItemForNonDesktopProps {
  isActive: boolean;
}

const StatisHeaderItemForNonDesktop = styled.div<StatisHeaderItemForNonDesktopProps>`
  width: 31%;
  text-align: center;
  font-size: 1.6rem;
  padding: 1rem 0;

  color: ${(props: StatisHeaderItemForNonDesktopProps) =>
    props.isActive ? "#333" : "#aaa"};

  background-color: ${(props: StatisHeaderItemForNonDesktopProps) =>
    props.isActive ? "#b4bcb7" : "#fff"};
  border-radius: 5px;
`;

const analysisFeatureList = ["統計分析", "明細匯出", "訪問紀錄"];

interface StatisSectionProps {
  statisData?: StatisResponse[] | null;
}

const StatisSection: FC<StatisSectionProps> = ({ statisData }) => {
  const context = useContext(adminContext);

  const formData = context.forms.find(
    (form) => form.id === context.editingFormId
  );

  const titleIndex = useRef<number>(0);
  const currentQuestionId = useRef<string>("default");
  // let currentQuestionId = "1";
  // console.log(currentQuestionId);
  return statisData ? (
    <>
      <StatisSectionContainer hasData>
        <StatisHeaderForNonDesktop>
          <Logo />
        </StatisHeaderForNonDesktop>
        <StatisHeaderForNonDesktop>
          {analysisFeatureList.map((item, i) => (
            <StatisHeaderItemForNonDesktop
              key={i}
              onClick={() =>
                context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, i)
              }
              isActive={i === context.currentAnalysisPage}
            >
              {item}
            </StatisHeaderItemForNonDesktop>
          ))}
        </StatisHeaderForNonDesktop>
        <StatisHeaderForNonDesktop>
          <StatisSectionHeadingForNonDesktop>
            問卷標題: {formData?.title}
          </StatisSectionHeadingForNonDesktop>
        </StatisHeaderForNonDesktop>
        <StatisSectionHeading>問卷標題: {formData?.title}</StatisSectionHeading>
        {statisData.map((data, i) => {
          console.log(currentQuestionId.current);
          if (!data.id.split("_")[0].includes(currentQuestionId.current)) {
            currentQuestionId.current = data.id.split("_")[0];
            titleIndex.current++;
          }
          const questionTypeTitle = `${titleIndex.current}.${
            questionConfig[data.type]
          }題 - `;
          if (data.numericData) {
            return (
              <StatisResponseItem
                index={i}
                key={data.id}
                id={data.id}
                title={
                  questionTypeTitle +
                  data.title +
                  " " +
                  " " +
                  `(${data.hasAnswerQuantityText})`
                }
                type={data.type}
                count={data.count}
                numericData={data.numericData}
              />
            );
          }
          return (
            <StatisResponseItem
              index={i}
              key={data.id}
              id={data.id}
              title={
                questionTypeTitle +
                data.title +
                " " +
                " " +
                `(${data.hasAnswerQuantityText})`
              }
              type={data.type}
              count={data.count}
            />
          );
        })}
      </StatisSectionContainer>
    </>
  ) : (
    <StatisSectionContainer hasData={false}>
      <StatisHeaderForNonDesktop>
        <Logo />
      </StatisHeaderForNonDesktop>
      <StatisHeaderForNonDesktop>
        {analysisFeatureList.map((item, i) => (
          <StatisHeaderItemForNonDesktop
            key={i}
            onClick={() =>
              context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, i)
            }
            isActive={i === context.currentAnalysisPage}
          >
            {item}
          </StatisHeaderItemForNonDesktop>
        ))}
      </StatisHeaderForNonDesktop>
    </StatisSectionContainer>
  );
};

export default StatisSection;
