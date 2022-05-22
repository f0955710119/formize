import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";

import statisFeatureConfig from "../../../configs/statisFeatureConfig";
import adminActionType from "../../../store/actionType/adminActionType";
import { adminContext } from "../../../store/context/adminContext";
import type { StatisResponse } from "../../../types/statis";
import Logo from "../../UI/Logo";
import { generateNoDataDashBoard } from "../../UI/noDataDashboard";
import scrollBar from "../../UI/scrollBar";
import StatisResponsedList from "./StatisResponsed/StatisResponsedList";

const hasDataBackgroundStyle = `
background-image: linear-gradient(
  rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)
  ),
  url("/images/dashboard-background.svg");
  background-size: cover;
  `;
const noDataDisplayText = `因為該問卷尚無回應，所以\\a還看不到統計資料唷!`;
const hasNoDataBackgroundStyle = generateNoDataDashBoard(noDataDisplayText);

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

  &::-webkit-scrollbar {
    width: 1rem;
  }
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
  color: ${(props: StatisHeaderItemForNonDesktopProps) => (props.isActive ? "#333" : "#aaa")};
  background-color: ${(props: StatisHeaderItemForNonDesktopProps) =>
    props.isActive ? "#b4bcb7" : "#fff"};
  border-radius: 5px;
`;

interface StatisSectionProps {
  statisData: StatisResponse[] | null;
}

const StatisSection: FC<StatisSectionProps> = ({ statisData }) => {
  const context = useContext(adminContext);

  const formData = context.forms.find((form) => form.id === context.editingFormId);
  const StatisTitleForForm = `問卷標題: ${formData?.title}`;
  const hasStatisData = statisData !== null;

  return (
    <StatisSectionContainer hasData={hasStatisData}>
      <StatisHeaderForNonDesktop>
        <Logo />
      </StatisHeaderForNonDesktop>
      <StatisHeaderForNonDesktop>
        {statisFeatureConfig.ANALYSIS_FEATURE_TITLE.map((item, i) => (
          <StatisHeaderItemForNonDesktop
            key={item}
            onClick={() => context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, i)}
            isActive={i === context.currentAnalysisPage}
          >
            {item}
          </StatisHeaderItemForNonDesktop>
        ))}
      </StatisHeaderForNonDesktop>
      {hasStatisData && (
        <>
          <StatisHeaderForNonDesktop>
            <StatisSectionHeadingForNonDesktop>
              {StatisTitleForForm}
            </StatisSectionHeadingForNonDesktop>
          </StatisHeaderForNonDesktop>
          <StatisSectionHeading>{StatisTitleForForm}</StatisSectionHeading>
          <StatisResponsedList statisData={statisData} />
        </>
      )}
    </StatisSectionContainer>
  );
};

export default StatisSection;
