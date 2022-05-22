import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";
import useResizeWindow from "../../../../hooks/useResizeWindow";
import { adminContext } from "../../../../store/context/adminContext";
import { generateNoDataDashBoard } from "../../../UI/noDataDashboard";
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
    padding: 0 1rem 0 0;
  }
`;

const NoGroupDataReminder = styled.div`
  width: 100%;
  height: 100%;
  ${generateNoDataDashBoard("目前尚無群組，\\a趕緊建立一個！\\a來開始問卷創建之旅！")};
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-image: url("/images/form-management.svg");
  filter: none;

  &::before {
    display: none;
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
  const { groups, editingGroupId } = useContext(adminContext);
  const isForDesktop = useResizeWindow(768);

  const isShowAllForm = editingGroupId === "0";
  const showSingleGroup = () => {
    const hasResponsedGroup = groups.find((group) => group.id === editingGroupId);
    if (!hasResponsedGroup) return groups[0];
    return hasResponsedGroup;
  };

  const groupListArray = isShowAllForm ? groups : [showSingleGroup()];
  const hasNoGroup = groupListArray[0] === undefined;

  return (
    <DashboardWrapper>
      <DashboardMainHeader />
      <DashboardAddGroupBar />
      <ChangeEditingGroupSelectForSmallDevice />
      <DashboardSubHeader />
      <DashboarMain>
        {hasNoGroup && <NoGroupDataReminder />}
        {!hasNoGroup &&
          groupListArray.map((group) => (
            <FormList key={group.id} group={group} isForDesktop={isForDesktop} />
          ))}
      </DashboarMain>
    </DashboardWrapper>
  );
};

export default Dashboard;
