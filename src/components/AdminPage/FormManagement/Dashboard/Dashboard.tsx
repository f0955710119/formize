import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";
import scrollBar from "../../../UI/scrollBar";
import ChangeEditingGroupSelect from "./ChangeEditingGroupSelect";
import DashboardAddGroupBar from "./DashboardAddGroupBar";
import DashboardMainHeader from "./DashboardMainHeader";
import DashboardSubHeader from "./DashboardSubHeader";
import FormList from "./Forms/FormList";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem 3rem 3.5rem;
  width: calc(100vw - 23rem);
  height: 100%;

  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("/images/dashboard-background.svg");
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
  ${scrollBar}

  @media ${breakpointConfig.mobileL} {
    padding: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ChangeEditingGroupSelectForSmallDevice = styled(ChangeEditingGroupSelect)`
  display: none;

  @media ${breakpointConfig.tabletS} {
    display: block;
    width: 100%;
    margin-bottom: 2rem;
    height: 6rem;
  }
`;

const Dashboard: FC = () => {
  return (
    <DashboardWrapper>
      <DashboardMainHeader />
      <DashboardAddGroupBar />
      <ChangeEditingGroupSelectForSmallDevice />
      <DashboardSubHeader />
      <DashboarMain>
        <FormList />
      </DashboarMain>
    </DashboardWrapper>
  );
};

export default Dashboard;
