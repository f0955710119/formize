import { FC } from "react";
import styled from "styled-components";

import Logo from "../../../UI/Logo";
import breakpointConfig from "../../../../configs/breakpointConfig";
import LogoutButton from "../../../UI/LogoutButton";
import ChangeEditingGroupSelect from "./ChangeEditingGroupSelect";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  width: 100%;
  height: 5rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ChangeEditingGroupSelectForBiggerDevice = styled(
  ChangeEditingGroupSelect
)`
  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const DashboardMainHeader: FC = () => {
  const logoMedia = `
  display: "none";

  @media ${breakpointConfig.laptopS}{
    display:inline-block;
    margin-right: 1rem;
  }`;

  const logoTextMedia = `
  display: none;
  @media ${breakpointConfig.laptopS}{
    display:block;
    font-size: 2.8rem
  }`;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo mediaSetting={logoMedia} textMediaSetting={logoTextMedia} />
        <ChangeEditingGroupSelectForBiggerDevice />
      </HeaderWrapper>
      <LogoutButton />
    </HeaderContainer>
  );
};

export default DashboardMainHeader;
