import { FC, useContext } from "react";
import styled from "styled-components";

import DashboardSubHeader from "./DashboardSubHeader";
import DashboardMainHeader from "./DashboardMainHeader";
import FormList from "./Forms/FormList";
import { adminContext } from "../../../../store/context/adminContext";

import breakpointConfig from "../../../../configs/breakpointConfig";
import DashboardAddGroupBar from "./DashboardAddGroupBar";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem 3rem 3.5rem;
  width: calc(100vw - 23rem);
  height: 100%;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/images/main-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;

  @media ${breakpointConfig.laptopS} {
    width: 100%;
  } ;
`;

const DashboarMain = styled.main`
  padding: 0 2rem 0 0;
  width: 100%;
  height: calc(100% - 6rem);
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
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

const Dashboard: FC = () => {
  const context = useContext(adminContext);
  const isShowAllGroup = context.editingGroupId === "0";
  return (
    <DashboardWrapper>
      <DashboardMainHeader />
      <DashboardAddGroupBar />
      <DashboardSubHeader />
      <DashboarMain>
        <FormList />
      </DashboarMain>
    </DashboardWrapper>
  );
};

export default Dashboard;
