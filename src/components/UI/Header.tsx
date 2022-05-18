import { useRouter } from "next/router";

import { FC, ReactNode } from "react";

import styled from "styled-components";

import useAppSelector from "../../hooks/useAppSelector";
import sweetAlert from "../../utils/sweetAlert";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.9rem;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #c8c8c8;
`;

const logoImageStyle = `
  transform: translateY(0);
`;

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const router = useRouter();
  const { currentStep } = useAppSelector((state) => state.question);

  const replaceToAdminHomePage = () => {
    router.replace("/admin");
  };

  const backToAdminHomePageHandler = () => {
    if (currentStep === 4) {
      replaceToAdminHomePage();
      return;
    }

    sweetAlert.clickToConfirmAlert(
      {
        title: "FORMiZE小提示",
        text: "現在回到首頁的話，\n會失去正在編輯的問卷資料，\n確定離開嗎?",
        confirmButtonText: "我要離開",
        cancelButtonText: "留在此頁",
      },
      replaceToAdminHomePage
    );
  };

  return (
    <HeaderWrapper>
      <Logo
        clickHandler={backToAdminHomePageHandler}
        imageMediaSetting={logoImageStyle}
      />
      {children}
      <LogoutButton />
    </HeaderWrapper>
  );
};

export default Header;
