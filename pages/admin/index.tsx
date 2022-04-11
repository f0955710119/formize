import type { NextPage } from "next";
import Header from "../../src/components/UI/Header";
import Main from "../../src/components/UI/Main";

const Admin: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <h1>Hello Admin</h1>
      </Main>
    </>
  );
};

export default Admin;
