import { FC, useState } from "react";
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
import { Settings, Styles } from "../../../../../types/survey";
import { Question } from "../../../../../types/question";

const SettingLayout = styled(Layout)`
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 40%;
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
  padding: 0 4rem;
  width: 100%;
  height: calc(100% - 17rem);
`;

const BackGroundCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 5rem;
  width: 100%;
  height: 25rem;
`;

const BackGroundContainerTitle = styled.span`
  display: inline-block;
  width: 7rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #a46302;
  border-bottom: 2px solid #a46302;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 4rem 0 4rem;
  width: 100%;
  height: calc(100% - 17rem);
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
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  height: 10rem;
`;

const styleTitleList = ["顏色主題", "字體樣式", "問卷背景"];
const defaultThemeList = helper.generateStyleKeys("_NAME");
const defaultFontList = helper.generateStyleKeys("_FONT");
const defaultBackgroundList = Object.keys(backgroundConfig)
  .filter((key) => key.includes("_"))
  .map((key) => backgroundConfig[key]);

const SettingBar: FC = () => {
  const [stylingOption, setStylingOption] = useState<number>(0);
  const { uid } = useAppSelector((state) => state.admin);

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
      <ButtonWrapper>
        <Button
          buttonType="button"
          clickHandler={() => clickToSendForm(sendingFormData)}
        >
          點我發佈問卷
        </Button>
        <Button buttonType="button" clickHandler={() => switchStepHanlder(2)}>
          返回題型設計
        </Button>
      </ButtonWrapper>
    </SettingLayout>
  );
};

export default SettingBar;
