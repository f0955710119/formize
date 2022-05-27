import { FC, ReactNode } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";

const Layout = styled.main`
  width: 100%;
  display: flex;
  height: calc(100vh - 6rem);
  border-top: 1px solid #c8c8c8;

  @media ${breakpointConfig.laptopM} {
    flex-direction: column;
    height: auto;
  } ;
`;

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main: FC<MainProps> = ({ children, className }: MainProps) => {
  return <Layout className={className}>{children}</Layout>;
};

export default Main;
