import { FC } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import useSwitchCurrentStep from "../../../../hooks/useSwitchCurrentStep";

import styled from "styled-components";
import SectionNormal from "./SectionNormal";
import SectionMedia from "./SectionMedia";
import SectionBanner from "./SectionBanner";
import Button from "../UI/Button";
import breakpointConfig from "../../../../configs/breakpointConfig";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 6rem);
  /* background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/images/setting-bg.svg");
  background-repeat: no-repeat;
  background-size: cover; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem auto 4rem auto;
  padding: 0 3.2rem 0 0;
  width: 68.4rem;
  height: calc(100% - 6rem);
  transform: translateX(1.5rem);

  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.7rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #87a792;
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

  @media ${breakpointConfig.laptopS} {
    width: 90%;
    transform: translateX(0);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  padding: 1rem 3rem;
  width: 15rem;
  height: 4rem;
  background-color: #c8c8c8;
  border-radius: 5px;

  &:hover {
    background-color: #6e917bd6;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const SettingForm: FC = () => {
  const router = useRouter();
  const switchStepHandler = useSwitchCurrentStep();
  const backToAdminIndexPage = (): void => {
    router.push("/admin");
  };

  return (
    <Wrapper>
      <Form>
        <SectionNormal />
        {/* <SectionMedia /> */}
        <SectionBanner />
        <ButtonContainer>
          <ButtonWrapper onClick={() => backToAdminIndexPage()}>
            <ButtonText>回到管理頁面</ButtonText>
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              switchStepHandler(2);
            }}
          >
            <ButtonText>前往題目設計</ButtonText>
          </ButtonWrapper>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default SettingForm;
