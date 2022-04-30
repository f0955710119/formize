import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../store/context/adminContext";
import NonTextTableContent from "./StatisTable/NonTextContent";
import Table from "./StatisTable/Table";
import TextTableContent from "./StatisTable/TextContent";

import type { StatisResponse } from "../../../types/statis";
import StatisResponseItem from "./StatisResponseItem";

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

  &::-webkit-scrollbar-track {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #8e9aa2;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
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
  margin-bottom: 2rem;
  font-size: 2.6rem;
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
`;

interface StatisSectionProps {
  statisData?: StatisResponse[];
}

const StatisSection: FC<StatisSectionProps> = ({ statisData }) => {
  const context = useContext(adminContext);
  const formData = context.forms.find(
    (form) => form.id === context.editingFormId
  );

  return statisData ? (
    <StatisSectionContainer>
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
  ) : (
    <></>
  );
};

export default StatisSection;
