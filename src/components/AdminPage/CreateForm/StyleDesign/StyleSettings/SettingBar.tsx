import { FC, useState } from "react";

import useStyleHandler from "../../../../../hooks/useStyleHandler";
import useDeployForm from "../../../../../hooks/useDeployForm";

import styled from "styled-components";
import Layout from "../../UI/Layout";
import Card from "./UI/Card";
import HeaderItem from "./HeaderItem";
import scrollBar from "../../../../UI/scrollBar";

import helper from "../../../../../utils/helper";
import useFormData from "../../../../../hooks/useFormData";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";
import backgroundConfig from "../../../../../configs/backgroundConfig";
import breakpointConfig from "../../../../../configs/breakpointConfig";

import type { Styles } from "../../../../../types/form";
import type { Question } from "../../../../../types/question";
import { SettingContext } from "../../../../../store/context/settingContext";
import styleConfig from "../../../../../configs/styleConfig";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

const SettingLayout = styled(Layout)`
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 18%;

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    order: 2;

    padding: 2rem 12rem 0 12rem;
    border-right: none;
  }

  @media ${breakpointConfig.tablet} {
    padding: 2rem 6rem 0 6rem;
  } ;
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

  @media ${breakpointConfig.laptopM} {
    height: calc(100% - 20rem);
    margin-bottom: 3rem;
    flex-direction: row;
    padding: 0;
  } ;
`;

const BackgroundCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  width: 100%;
  height: 25rem;
  overflow-y: scroll;
  padding-right: 1rem;

  ${scrollBar}

  @media ${breakpointConfig.laptopM} {
    flex-direction: row;
    padding-right: 0;
    height: 18rem;
    overflow-y: hidden;
    overflow-x: scroll;
    margin-bottom: 0;
    &:not(:last-child) {
      margin-right: 2rem;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
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
  ${scrollBar}

  @media ${breakpointConfig.laptopM} {
    flex-direction: row;
    padding: 0;
    overflow-y: hidden;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
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
  cursor: pointer;

  &:hover {
    background-color: #ffc652c2;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media ${breakpointConfig.laptopM} {
    margin: 0 auto 2rem auto;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const styleTitleList = ["顏色主題", "字體樣式", "問卷背景"];
const defaultThemeList = helper.generateStyleKeys("_NAME");
const defaultThemeImages = [
  process.env.NEXT_PUBLIC_ORIGIN + "/images/peace-ground.svg",
  process.env.NEXT_PUBLIC_ORIGIN + "/images/happy-yellow.svg",
  process.env.NEXT_PUBLIC_ORIGIN + "/images/fall-forest.svg",
];
const defaultFontList = helper.generateStyleKeys("_FONT");
const defaultFont = [
  styleConfig.OPENHUNNINN,
  styleConfig.HANAMINA,
  styleConfig.TAIPEISANSTCBOLD,
];
const defaultBackgroundList = Object.keys(backgroundConfig)
  .filter((key) => key.includes("_"))
  .map((key) => backgroundConfig[key]);
const defaultBackgroundUrl = Object.keys(backgroundConfig)
  .filter((key) => !key.includes("_"))
  .map((key) => backgroundConfig[key]);

const SettingBar: FC = () => {
  const { theme, font, backgroundImages } = useAppSelector(
    (state) => state.style
  );
  const [stylingOption, setStylingOption] = useState<number>(0);

  const switchStepHanlder = useSwitchCurrentStep();
  const switchStyleHandler = useStyleHandler();
  const sendingFormData = useFormData();
  const sendFormDataHandler = useDeployForm();

  const clickToSendForm = async (sendingFormData: {
    uid: string;
    groupId: string;
    settings: any;
    questions: Question[];
    styles: Styles;
    settingContextData: SettingContext;
  }) => {
    try {
      await sendFormDataHandler(sendingFormData);
    } catch (error) {
      console.error(error);
    }
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
              isActive={+theme === i}
              imageUrl={defaultThemeImages[i]}
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
              isActive={+font === i}
              title={fontTitle}
              key={i}
              font={defaultFont[i]}
              dispatchHandler={switchStyleHandler}
            />
          ))}
        </CardContainer>
      )}
      {stylingOption === 2 && (
        <CardContainer>
          {defaultBackgroundList.map((background, i) => {
            return (
              <Card
                isActive={defaultBackgroundUrl[i] === backgroundImages[0]}
                title={background}
                key={i}
                dispatchHandler={switchStyleHandler}
                imageUrl={defaultBackgroundUrl[i]}
                isBackground
              />
            );
          })}
        </CardContainer>
      )}
      <ButtonWrapper
        onClick={() => clickToSendForm(sendingFormData)}
        style={{ backgroundColor: "#ffc652c2" }}
      >
        <ButtonText>點我發佈問卷</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => switchStepHanlder(2)}>
        <ButtonText>返回題型設計</ButtonText>
      </ButtonWrapper>
    </SettingLayout>
  );
};

export default SettingBar;
