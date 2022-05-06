import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";

const ButtonWrapper = styled.button`
  padding: 0.4rem 1rem;
  width: 10rem;
  height: 3.2rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-radius: 3px;
  background-color: #555;
  color: #fff;

  &:hover {
    background-color: #333;
  }
`;

const LogoutButton: FC = () => {
  const router = useRouter();
  const logoutHandler = (): void => {
    firebase.nativeSignOut();
    alert("登出成功，將回首頁");
    router.push("/");
  };

  return (
    <ButtonWrapper type="button" onClick={logoutHandler}>
      登出
    </ButtonWrapper>
  );
};

export default LogoutButton;
