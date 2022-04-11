import { FC } from "react";
import styled from "styled-components";

import DashboardHeader from "./DashboardHeader";
import SurveyList from "./Surveys/SurveyList";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.4rem 4rem 3rem 4rem;
  width: calc(100vw - 30rem);
  height: calc(100vh - 6rem);
`;

const DashboarMain = styled.main`
  padding: 4rem 3rem 4rem 4rem;
  width: 100%;
  height: calc(100% - 6rem);
  background-color: #f0f0f0;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f90;
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

const Dashboard: FC = () => {
  return (
    <DashboardWrapper>
      <DashboardHeader />
      <DashboarMain>
        <SurveyList />
      </DashboarMain>
    </DashboardWrapper>
  );
};

export default Dashboard;
