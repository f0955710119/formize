import loginConfig from "../configs/loginConfig";
import { SignFunctionType } from "../types/login";
import firebase from "./firebase";

export const checkSignInput = (email: string, password: string) => {
  const emailRegex = loginConfig.EMAIL_REG;
  const passwordRegex = loginConfig.PASSWORD_REG;
  const invalidEmail = !emailRegex.test(email);
  const invalidPassword = !passwordRegex.test(password);
  if (invalidEmail) return "請輸入正確的Email格式";
  if (invalidPassword) return "密碼請輸入至少6個字元的英文字母或數字，且不得包含特殊符號";
  return null;
};

export const signInCallback: SignFunctionType = async (email, password) => {
  const failToSignErrorMessage = "帳號密碼的輸入可能有錯別字，請再確認一次您的帳號密碼";

  const adminInfo = await firebase.nativeLogin({ email, password }).catch(() => {
    throw new Error(failToSignErrorMessage);
  });

  if (!adminInfo) throw new Error(failToSignErrorMessage);

  const uid = "" + adminInfo.id;
  return uid;
};

export const signUpCallback: SignFunctionType = async (email, password) => {
  const failToSignErrorMessage = "帳號密碼已存在，請嘗試其他排序組合";
  const uid = await firebase.createNativeUser({ email, password }).catch(() => {
    throw new Error(failToSignErrorMessage);
  });

  if (!uid) throw new Error(failToSignErrorMessage);
  return uid;
};
