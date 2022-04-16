import { FC, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

const Layout = styled.main`
  width: 100%;
  display: flex;
  height: calc(100vh - 6rem - 6rem);
  border-top: 1px solid #c8c8c8;
`;

interface MainProps {
  children: ReactNode;
  onClick?: MouseEventHandler;
}

const Main: FC<MainProps> = ({ children, onClick }: MainProps) => {
  return <Layout>{children}</Layout>;
};

export default Main;
