import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../store/context/adminContext";
import Logo from "../../UI/Logo";

import type { StatisResponse } from "../../../types/statis";
import StatisResponseItem from "./StatisResponseItem";
import scrollBar from "../CreateForm/UI/scrollBar";
import breakpointConfig from "../../../configs/breakpointConfig";
import adminActionType from "../../../store/actionType/adminActionType";

const StatisSectionContainer = styled.section`
  padding: 2rem 2.5rem 0 3.5rem;
  width: calc(100% - 23rem);
  height: 100%;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("/images/main-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;

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
  statisData?: StatisResponse[];
}

const StatisSection: FC<StatisSectionProps> = ({ statisData }) => {
  const context = useContext(adminContext);

  const formData = context.forms.find(
    (form) => form.id === context.editingFormId
  );

  return statisData ? (
    <>
      <StatisSectionContainer>
        <StatisHeaderForNonDesktop>
          <Logo />
        </StatisHeaderForNonDesktop>
        <StatisHeaderForNonDesktop>
          {analysisFeatureList.map((item, i) => (
            <StatisHeaderItemForNonDesktop
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
        {statisData.map((data) => {
          if (data.numericData) {
            return (
              <StatisResponseItem
                key={data.id}
                id={data.id}
                title={data.title}
                type={data.type}
                count={data.count}
                numericData={data.numericData}
              />
            );
          }
          return (
            <StatisResponseItem
              key={data.id}
              id={data.id}
              title={data.title}
              type={data.type}
              count={data.count}
            />
          );
        })}
      </StatisSectionContainer>
    </>
  ) : (
    <></>
  );
};

export default StatisSection;
