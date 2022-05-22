import { FC, useContext, useState } from "react";

import styled from "styled-components";

import backgroundConfig from "../../../../../configs/backgroundConfig";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import styleConfig from "../../../../../configs/styleConfig";
import useDeployForm from "../../../../../hooks/useDeployForm";
import useStyleHandler from "../../../../../hooks/useStyleHandler";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";
import type { SettingContext } from "../../../../../types/setting";
import type { Style } from "../../../../../types/style";
import type { Question } from "../../../../../types/question";
import helper from "../../../../../utils/helper";
import scrollBar from "../../../../UI/scrollBar";
import Layout from "../../UI/Layout";
import SettingHeaderItem from "./SettingHeaderItem";
import Card from "./UI/Card";
import { styleContext } from "../../../../../store/context/styleContext";
import sweetAlert from "../../../../../utils/sweetAlert";
import titleConfig from "../../../../../configs/titleConfig";

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

const defaultThemeList = helper.generateConfigKeys("_NAME", styleConfig);
const defaultThemeImages = helper
  .generateConfigKeys("THEME_IMAGE_", styleConfig)
  .map((path) => `${process.env.NEXT_PUBLIC_ORIGIN}${path}`);
const defaultFontList = helper.generateConfigKeys("_FONT", styleConfig);
const defaultFont = helper.generateConfigKeys("_CSS", styleConfig);
const defaultBackgroundNameList = helper.generateConfigKeys("_BG", backgroundConfig);
const defaultBackgroundUrlList = helper.generateConfigKeys("_URL", backgroundConfig);

const SettingBar: FC = () => {
  const { theme, font, backgroundImage } = useContext(styleContext);
  const [stylingOption, setStylingOption] = useState<number>(0);

  const switchStepHanlder = useSwitchCurrentStep();
  const switchStyleHandler = useStyleHandler();
  const sendFormDataHandler = useDeployForm();

  const clickToSendForm = async () => {
    try {
      await sendFormDataHandler();
    } catch (error: any) {
      console.error(error.message);
      sweetAlert.errorReminderAlert("新增問卷時發生異常，請稍後再嘗試");
    }
  };

  return (
    <SettingLayout>
      <Header>
        {titleConfig.STYLE_TITLE.map((title, i) => (
          <SettingHeaderItem
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
              title={themeTitle}
              key={i}
              dispatchHandler={() => switchStyleHandler(themeTitle, "theme")}
              imageUrl={defaultThemeImages[i]}
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
              dispatchHandler={() => switchStyleHandler(fontTitle, "font")}
              font={defaultFont[i]}
            />
          ))}
        </CardContainer>
      )}
      {stylingOption === 2 && (
        <CardContainer>
          {defaultBackgroundNameList.map((background, i) => (
            <Card
              isActive={defaultBackgroundUrlList[i] === backgroundImage}
              title={background}
              key={i}
              dispatchHandler={() => switchStyleHandler(background, "backgroundImage")}
              imageUrl={defaultBackgroundUrlList[i]}
              isBackground
            />
          ))}
        </CardContainer>
      )}
      <ButtonWrapper onClick={() => clickToSendForm()} style={{ backgroundColor: "#ffc652c2" }}>
        <ButtonText>點我發佈問卷</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => switchStepHanlder(2)}>
        <ButtonText>返回題型設計</ButtonText>
      </ButtonWrapper>
    </SettingLayout>
  );
};

export default SettingBar;
