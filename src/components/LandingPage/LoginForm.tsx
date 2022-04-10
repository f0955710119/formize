import { FC } from "react";
import styled from "styled-components";

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

const TraditionalText = styled.span`
  font-family: inherit;
`;

const EnglishText = styled.span`
  font-family: sans-serif;
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
  return (
    <Form>
      <DefaultLandingTitle>
        <TraditionalText>歡迎來到</TraditionalText>
        <EnglishText>Formize</EnglishText>
      </DefaultLandingTitle>
      <Field>
        <Label>帳號</Label>
        <Input type="text" name="account" autoComplete="off" />
      </Field>
      <Field>
        <Label>密碼</Label>
        <Input type="password" name="password" autoComplete="off" />
      </Field>
      <Button>登入</Button>
      <Button>註冊</Button>
    </Form>
  );
};

export default LoginForm;
