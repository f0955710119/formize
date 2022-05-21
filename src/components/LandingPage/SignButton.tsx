import { useRouter } from "next/router";
import { FC, useContext } from "react";
import styled from "styled-components";
import breakpointConfig from "../../configs/breakpointConfig";
import loginConfig from "../../configs/loginConfig";
import adminActionType from "../../store/actionType/adminActionType";
import { adminContext } from "../../store/context/adminContext";
import { SignFunctionType } from "../../types/login";
import firebase from "../../utils/firebase";
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

const checkSignInput = (email: string, password: string) => {
  const emailRegex = loginConfig.EMAIL_REG;
  const passwordRegex = loginConfig.PASSWORD_REG;
  const invalidEmail = !emailRegex.test(email);
  const invalidPassword = !passwordRegex.test(password);
  if (invalidEmail) return "請輸入正確的Email格式";
  if (invalidPassword) return "密碼請輸入至少6個字元的英文字母或數字，且不得包含特殊符號";
  return null;
};

const signInHandler: SignFunctionType = async (email, password) => {
  const failToSignErrorMessage = "帳號密碼的輸入可能有錯別字，請再確認一次您的帳號密碼";

  const adminInfo = await firebase.nativeLogin({ email, password }).catch(() => {
    throw new Error(failToSignErrorMessage);
  });

  if (!adminInfo) throw new Error(failToSignErrorMessage);

  const uid = "" + adminInfo.id;
  return uid;
};

const signUpCallback: SignFunctionType = async (email, password) => {
  const failToSignErrorMessage = "帳號密碼已存在，請嘗試其他排序組合";
  const uid = await firebase.createNativeUser({ email, password }).catch(() => {
    throw new Error(failToSignErrorMessage);
  });

  if (!uid) throw new Error(failToSignErrorMessage);
  return uid;
};

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
  const signCallback = isSignIn ? signInHandler : signUpCallback;

  const successSign = (uid: string) => {
    setField(adminActionType.UID, uid);
    const loginSuccessMessage = "驗證完成，將前往問卷管理頁面!";
    sweetAlert.loadedReminderAlert(loginSuccessMessage);
    setTimeout(() => {
      sweetAlert.closeAlert();
    }, 1500);
    router.push("/admin");
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
