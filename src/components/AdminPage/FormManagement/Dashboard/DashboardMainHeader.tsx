import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";
import Logo from "../../../UI/Logo";
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
  width: 100%;
`;

const ChangeEditingGroupSelectForBiggerDevice = styled(ChangeEditingGroupSelect)`
  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const logoMedia = `
  display: "none";

  @media ${breakpointConfig.laptopS}{
    display:flex;
    margin-right: 2rem;
  }
`;

const logoImageMedia = `
  display:none;
  @media ${breakpointConfig.laptopS}{
    display:inline-block;
    margin-right: 0.4rem;
    transform: translateY(0);
  }
`;

const logoTextMedia = `
  display: none;
  @media ${breakpointConfig.laptopS}{
    display:block;
    font-size: 2.8rem
  }
`;

const DashboardMainHeader: FC = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo
          mediaSetting={logoMedia}
          textMediaSetting={logoTextMedia}
          imageMediaSetting={logoImageMedia}
        />
        <ChangeEditingGroupSelectForBiggerDevice />
      </HeaderWrapper>
      <LogoutButton />
    </HeaderContainer>
  );
};

export default DashboardMainHeader;
