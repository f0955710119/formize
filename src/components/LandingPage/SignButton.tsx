import { useRouter } from "next/router";

import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../configs/breakpointConfig";
import adminActionType from "../../store/actionType/adminActionType";
import { adminContext } from "../../store/context/adminContext";
import { SignFunctionType } from "../../types/login";
import { checkSignInput, signInCallback, signUpCallback } from "../../utils/loginUtils";
import sweetAlert from "../../utils/sweetAlert";

const Button = styled.button`
  margin: 0 auto;
  margin-top: 1rem;

  padding: 1rem;
  width: 72.9%;
  height: 4rem;

  color: #fff;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: #333a42;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #1b375a;
  }

  @media ${breakpointConfig.desktopS} {
    width: 60.9%;
    font-size: 1.4rem;
  }
`;

interface SignButtonProps {
  userInfo: { email: string; password: string };
  isSignIn: boolean;
  updateErrorMessage: (errorMessage: string) => void;
  className?: string;
}

const SignButton: FC<SignButtonProps> = (props) => {
  const router = useRouter();
  const { setField } = useContext(adminContext);
  const { userInfo, isSignIn, updateErrorMessage, className } = props;
  const signCallback = isSignIn ? signInCallback : signUpCallback;

  const successSign = (uid: string) => {
    setField(adminActionType.UID, uid);
    const loginSuccessMessage = "驗證完成！";
    sweetAlert.loadedReminderAlert(loginSuccessMessage);
    setTimeout(() => {
      sweetAlert.closeAlert();
    }, 1500);
    router.replace("/admin");
  };

  const signHandler = async (signInfo: {
    email: string;
    password: string;
    callback: SignFunctionType;
  }) => {
    try {
      const { email, password, callback } = signInfo;
      const errorMessage = checkSignInput(email, password);
      if (errorMessage) throw new Error(errorMessage);
      sweetAlert.loadingReminderAlert("驗證中...");
      const uid = await callback(email, password);
      if (uid === "") return;
      successSign(uid);
    } catch (error: any) {
      updateErrorMessage(error.message);
    }
  };

  const signParams = {
    ...userInfo,
    callback: signCallback,
  };

  return (
    <Button type="button" className={className} onClick={() => signHandler(signParams)}>
      {isSignIn ? "登入" : "註冊"}
    </Button>
  );
};

export default SignButton;
