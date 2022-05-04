import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "./Logo";
import firebase from "../../utils/firebase";
import LogoutButton from "./LogoutButton";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #c8c8c8;
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  width: 10rem;
  height: 3.2rem;
  font-size: 1.6rem;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const router = useRouter();
  const logoutHandler = (): void => {
    firebase.nativeSignOut();
    alert("登出成功，將回首頁");
    router.push("/");
  };
  return (
    <HeaderWrapper>
      <Logo />
      {children}
      <LogoutButton />
    </HeaderWrapper>
  );
};

export default Header;
