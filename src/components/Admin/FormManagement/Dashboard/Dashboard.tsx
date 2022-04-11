import { FC } from "react";
import styled from "styled-components";

import DashboardHeader from "./DashboardHeader";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.4rem 4rem 4rem 4rem;
  width: calc(100vw - 30rem);
  height: calc(100vh - 6rem);
`;

const Dashboard: FC = () => {
  return (
    <DashboardWrapper>
      <DashboardHeader />
    </DashboardWrapper>
  );
};

export default Dashboard;
