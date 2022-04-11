import type { NextPage } from "next";
import Header from "../../src/components/UI/Header";
import Main from "../../src/components/UI/Main";
import GroupSideBar from "../../src/components/Admin/FormManagement/SideBar/GroupSideBar";
import Dashboard from "../../src/components/Admin/FormManagement/Dashboard/Dashboard";

const Admin: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <GroupSideBar />
        <Dashboard />
      </Main>
    </>
  );
};

export default Admin;
