import { FC, useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { SignFunctionType, UserInfoType } from "../../types/login";
import { ChangeHandler } from "../../types/common";
import { adminContext } from "../../store/context/adminContext";
import loginConfig from "../../configs/loginConfig";
import useInitAdminInfo from "../../hooks/useInitAdminInfo";
import adminActionType from "../../store/actionType/adminActionType";

const Form = styled.form`
  position: absolute;
  top: 27%;
  right: 20%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 40rem;
  z-index: 3;
`;

const DefaultLandingTitle = styled.h1`
  display: block;
  /* margin-bottom: 1rem; */
  padding-bottom: 1rem;
  width: 100%;
  font-size: 3.2rem;
  font-weight: normal;
  text-align: center;
`;

const TraditionalText = styled.span`
  font-family: inherit;
  margin-right: 0.4rem;
  letter-spacing: 1px;
`;

const EnglishText = styled.span`
  font-family: inherit;
  font-weight: bold;
  /* background-image: linear-gradient(to right, #fcbe63, #c4944d); */
  background-color: #fcbe63;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const SubTitle = styled(TraditionalText)`
  position: relative;
  font-size: 2.4rem;
  margin-bottom: 6.4rem;
  text-align: center;
  letter-spacing: 4.4px;
  padding: 0 1rem 0 2rem;
  color: #555;

  &::before {
    content: "";
    position: absolute;
    bottom: -0.2rem;
    left: 7.8rem;
    height: 1rem;
    width: 11rem;
    background-color: #fcbf634c;
    /* border-radius: 30px; */
  }
`;

const Field = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  border-radius: 3px;
`;

const Label = styled.label`
  width: 10rem;
  position: absolute;
  top: 0.75rem;
  left: 5.6rem;
  font-size: 1.8rem;
  color: #a77121;
  letter-spacing: 8px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 11.5rem;
  left: 50%;
  width: 71%;
  transform: translate(-47%, 0);
  font-size: 1.5rem;
  color: #c4944d;

  animation: moveInTop 0.5s ease-in-out;

  @keyframes moveInTop {
    0% {
      opacity: 0;
      transform: translate(-47%, -1rem);
    }
    100% {
      opacity: 1;
      transform: translate(-47%, 0);
    }
  }
`;

const Input = styled.input`
  width: 72%;
  padding: 1rem 0;
  font-size: 1.8rem;
  border: none;
  border-bottom: 1px solid #777;
  margin: 0 auto;
  background-color: transparent;

  &:focus ~ ${Label},&:not(:focus):valid ~ ${Label} {
    opacity: 0;
    transform: translateY(-2rem);
  }
`;

const Button = styled.button`
  margin: 0 auto;
  margin-top: 1rem;

  padding: 1rem;
  width: 72.9%;
  height: 4rem;

  color: #fff;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: #cf7581;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #9c414d;
  }
`;

const LoginForm: FC = () => {
  const router = useRouter();
  const context = useContext(adminContext);
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    errorMessage: "",
  });

  const changeAccountHandler: ChangeHandler = (event) => {
    const { value } = event.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        email: value,
        errorMessage: "",
      };
    });
  };
  const changePasswordHandler: ChangeHandler = (event) => {
    const { value } = event.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        password: value,
        errorMessage: "",
      };
    });
  };

  const checkSignInput = (email: string, password: string) => {
    const emailRegex = loginConfig.EMAIL_REG;
    const passwordRegex = loginConfig.PASSWORD_REG;
    const invalidEmail = !emailRegex.test(email);
    const invalidPassword = !passwordRegex.test(password);

    if (invalidEmail) return "請輸入正確的Email格式";

    if (invalidPassword)
      return "密碼請輸入至少6個字元的英文字母或數字，且不得包含特殊符號";

    return null;
  };

  const signinHandler: SignFunctionType = async (email, password) => {
    // BUG: 顯示給使用者跟開發的人的錯誤訊息不一樣，之後要優化
    try {
      const errorMessage = checkSignInput(email, password);
      if (errorMessage) throw new Error(errorMessage);

      const adminInfo = await firebase
        .nativeLogin({ email, password })
        .catch(() => {
          throw new Error(
            "帳號密碼的輸入可能有錯別字，請再確認一次您的帳號密碼"
          );
        });

      if (!adminInfo)
        throw new Error("帳號密碼的輸入可能有錯別字，請再確認一次您的帳號密碼");

      const uid = "" + adminInfo.id;

      context.setField(adminActionType.UID, uid);

      alert("登入成功，將前往問卷管理頁面!");
      router.push("/admin");
    } catch (error: any) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          errorMessage: error.message,
        };
      });
      console.log(error.message);
    }
  };

  const signupHandler: SignFunctionType = async (email, password) => {
    try {
      const errorMessage = checkSignInput(email, password);
      if (errorMessage) throw new Error(errorMessage);
      //BUG: 之後要寫type gurad + validation
      const uid = await firebase
        .createNativeUser({ email, password })
        .catch(() => {
          throw new Error("帳號密碼已存在，請嘗試其他排序組合");
        });

      if (!uid) throw new Error("帳號密碼已存在，請嘗試其他排序組合");
      context.setField(adminActionType.UID, uid);
      router.push("/admin");
      alert("註冊成功，將前往問卷管理頁面!");
    } catch (error: any) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          errorMessage: error.message,
        };
      });
      console.log(error.message);
    }
  };
  return (
    <Form>
      <DefaultLandingTitle>
        <TraditionalText>歡迎來到</TraditionalText>
        <EnglishText>FORMiZE</EnglishText>
      </DefaultLandingTitle>
      <SubTitle>您製作問卷的最佳幫手</SubTitle>
      {userInfo.errorMessage !== "" && (
        <ErrorMessage>{userInfo.errorMessage}</ErrorMessage>
      )}
      <Field>
        <Input
          type="text"
          name="account"
          autoComplete="off"
          id="account"
          onChange={changeAccountHandler}
          required
        />
        <Label htmlFor="account">帳號</Label>
      </Field>
      <Field>
        <Input
          type="password"
          name="password"
          autoComplete="off"
          id="password"
          onChange={changePasswordHandler}
          required
        />
        <Label htmlFor="password">密碼</Label>
      </Field>
      <Button
        type="button"
        onClick={() => signinHandler(userInfo.email, userInfo.password)}
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
