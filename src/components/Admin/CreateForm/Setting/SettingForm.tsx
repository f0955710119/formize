import { FC } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import useSwitchCurrentStep from "../../../../hooks/useSwitchCurrentStep";

import styled from "styled-components";
import SectionNormal from "./SectionNormal";
import SectionMedia from "./SectionMedia";
import SectionBanner from "./SectionBanner";
import Button from "../UI/Button";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 6rem - 6rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem auto 4rem auto;
  padding: 0 2rem 0 0;
  width: 62.4rem;
  height: calc(100% - 6rem);

  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const SettingForm: FC = () => {
  const router = useRouter();
  const switchStepHandler = useSwitchCurrentStep();
  const backToAdminIndexPage = (): void => {
    router.push("/admin");
  };
  const setting = useAppSelector((state) => state.setting);
  console.log(setting);
  return (
    <Wrapper>
      <Form>
        <SectionNormal />
        {/* <SectionMedia /> */}
        <SectionBanner />
        <ButtonWrapper>
          <Button buttonType="button" clickHandler={backToAdminIndexPage}>
            回到管理頁面
          </Button>
          <Button buttonType="button" clickHandler={() => switchStepHandler(2)}>
            進入題目設計
          </Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

export default SettingForm;
