import { FC, useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { SignFunctionType, UserInfoType } from "../../types/login";
import { ChangeHandler } from "../../types/common";

const DefaultLandingTitle = styled.h1`
  display: block;
  font-size: 3.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
  width: 100%;
`;
// BUG:之後會做成UI接收props來改變字體
const TraditionalText = styled.span`
  font-family: inherit;
  margin-right: 0.4rem;
  letter-spacing: 1px;
`;

const EnglishText = styled.span`
  font-family: inherit;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 40rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  border-radius: 3px;
`;

const Label = styled.label`
  width: 10rem;
`;

const Input = styled.input`
  width: 30rem;
  border-radius: 3px;
  padding: 0.4rem;
  border: 1px solid #777;
`;

const Button = styled.button`
  width: 100%;
  height: 4rem;
  padding: 1rem;

  color: #333;
  font-size: 1.6rem;
  background-color: #777;
  border-radius: 3px;

  &:hover {
    color: #fff;
    background-color: #333;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const LoginForm: FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function getStoredImage(name: string, format: string) {
      const path = firebase.getStorageRef(name, format);
      const url = await firebase.getStoredImages(path);
      console.log(url);
    }
    // router.isReady && getStoredImage("layered-waves-haikei-01-desktop", "svg");
  }, [router.isReady]);

  const changeAccountHandler: ChangeHandler = (event) => {
    const { value } = event.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        email: value,
      };
    });
  };
  const changePasswordHandler: ChangeHandler = (event) => {
    const { value } = event.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        password: value,
      };
    });
  };
  const singinHandler: SignFunctionType = async (email, password) => {
    try {
      //BUG: 之後要寫type gurad + validation
      await firebase.nativeLogin({ email, password });
      window.alert("登入成功，將前往問卷管理頁面!");
      router.push("/admin");
    } catch (error: any) {
      window.alert(error.message);
    }
  };

  const signupHandler: SignFunctionType = async (email, password) => {
    try {
      //BUG: 之後要寫type gurad + validation
      await firebase.createNativeUser({ email, password });
      router.push("/admin");
      window.alert("註冊成功，將前往問卷管理頁面!");
    } catch (error: any) {
      window.alert(error.message);
    }
  };
  return (
    <Form>
      <DefaultLandingTitle>
        <TraditionalText>歡迎來到</TraditionalText>
        <EnglishText>Formize</EnglishText>
      </DefaultLandingTitle>
      <Field>
        <Label>帳號</Label>
        <Input
          type="text"
          name="account"
          autoComplete="off"
          onChange={changeAccountHandler}
        />
      </Field>
      <Field>
        <Label>密碼</Label>
        <Input
          type="password"
          name="password"
          autoComplete="off"
          onChange={changePasswordHandler}
        />
      </Field>
      <Button
        type="button"
        onClick={() => singinHandler(userInfo.email, userInfo.password)}
      >
        登入
      </Button>
      <Button
        type="button"
        onClick={() => signupHandler(userInfo.email, userInfo.password)}
      >
        註冊
      </Button>
    </Form>
  );
};

export default LoginForm;
