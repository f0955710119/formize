import { ReactNode } from "react";
import styled from "styled-components";

const MainWrapper = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh - 6rem;
`;

interface Main {
  children: ReactNode;
}

const Main = ({ children }: Main) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
