import { FC, useContext, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import useCheckUid from "../../../../../hooks/useCheckUid";
import useStyleHandler from "../../../../../hooks/useStyleHandler";
import useDeployForm from "../../../../../hooks/useDeployForm";

import styled from "styled-components";
import Layout from "../../UI/Layout";
import Card from "./UI/Card";
import HeaderItem from "./HeaderItem";
import Button from "../../UI/Button";

import helper from "../../../../../utils/helper";
import useFormData from "../../../../../hooks/useFormData";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";
import backgroundConfig from "../../../../../configs/backgroundConfig";
import { Settings, Styles } from "../../../../../types/form";
import { Question } from "../../../../../types/question";
import { adminContext } from "../../../../../store/context/adminContext";

const SettingLayout = styled(Layout)`
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 18%;
`;

const Header = styled.header`
  display: flex;
  margin-bottom: 3rem;
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #c8c8c8;
`;

const BackGroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 0 2rem;
  width: 100%;
  height: calc(100% - 18rem);
`;

const BackGroundCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  width: 100%;
  height: 25rem;
  overflow-y: scroll;
  padding-right: 1rem;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b4bcb7;
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

const BackGroundContainerTitle = styled.span`
  display: inline-block;
  width: 7rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #6e917b;
  border-bottom: 2px solid #6e917b;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0 0 2rem;
  width: 100%;
  height: calc(100% - 20rem);
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b4bcb7;
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

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 3rem;
  width: 88%;
  height: 4rem;
  background-color: #c8c8c8;
  border-radius: 5px;

  &:hover {
    background-color: #6e917bd6;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const styleTitleList = ["顏色主題", "字體樣式", "問卷背景"];
const defaultThemeList = helper.generateStyleKeys("_NAME");
const defaultFontList = helper.generateStyleKeys("_FONT");
const defaultBackgroundList = Object.keys(backgroundConfig)
  .filter((key) => key.includes("_"))
  .map((key) => backgroundConfig[key]);

const SettingBar: FC = () => {
  const [stylingOption, setStylingOption] = useState<number>(0);
  const uid = useContext(adminContext).uid;

  useCheckUid(uid);
  const switchStepHanlder = useSwitchCurrentStep();
  const switchStyleHandler = useStyleHandler();
  const sendFormDataHandler = useDeployForm();
  const sendingFormData = useFormData();

  console.log(sendingFormData);

  const clickToSendForm = async (sendingFormData: {
    uid: string;
    groupId: string;
    settings: any;
    questions: Question[];
    styles: Styles;
  }) => {
    await sendFormDataHandler(sendingFormData);
    switchStepHanlder(4);
  };

  return (
    <SettingLayout>
      <Header>
        {styleTitleList.map((title, i) => (
          <HeaderItem
            key={i}
            title={title}
            option={i}
            stylingOption={stylingOption}
            setStylingOption={setStylingOption}
          />
        ))}
      </Header>
      {stylingOption === 0 && (
        <CardContainer>
          {defaultThemeList.map((themeTitle, i) => (
            <Card
              title={themeTitle}
              key={i}
              dispatchHandler={switchStyleHandler}
            />
          ))}
        </CardContainer>
      )}
      {stylingOption === 1 && (
        <CardContainer>
          {defaultFontList.map((fontTitle, i) => (
            <Card
              title={fontTitle}
              key={i}
              dispatchHandler={switchStyleHandler}
            />
          ))}
        </CardContainer>
      )}
      {stylingOption === 2 && (
        <BackGroundContainer>
          <BackGroundContainerTitle>預設圖檔</BackGroundContainerTitle>
          <BackGroundCardContainer>
            {defaultBackgroundList.map((Background, i) => {
              return (
                <Card
                  title={Background}
                  key={i}
                  dispatchHandler={switchStyleHandler}
                />
              );
            })}
          </BackGroundCardContainer>
          <BackGroundContainerTitle>上傳自訂</BackGroundContainerTitle>
          <BackGroundCardContainer></BackGroundCardContainer>
        </BackGroundContainer>
      )}
      <ButtonWrapper onClick={() => clickToSendForm(sendingFormData)}>
        <ButtonText>點我發佈問卷</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => switchStepHanlder(2)}>
        <ButtonText>返回題型設計</ButtonText>
      </ButtonWrapper>
    </SettingLayout>
  );
};

export default SettingBar;
