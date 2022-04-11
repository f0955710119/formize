import type { NextPage } from "next";
import Header from "../../src/components/UI/Header";
import Main from "../../src/components/UI/Main";
import GroupSideBar from "../../src/components/Admin/FormManagement/SideBar/GroupSideBar";

const Admin: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <GroupSideBar />
      </Main>
    </>
  );
};

export default Admin;
