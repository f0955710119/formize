// Card / Button ( router ) / O[tion hEADER] / able to scroll
import { FC, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import styled from "styled-components";
import Layout from "../../UI/Layout";
import Card from "./UI/Card";
import HeaderItem from "./HeaderItem";
import Button from "../../UI/Button";
import styleConfig from "../../../../../configs/styleConfig";
import { styleActions } from "../../../../../store/slice/styleSlice";
import themes from "../../../../../store/theme/theme";
import styleActionType from "../../../../../store/actionType/styleActionType";
import helper from "../../../../../utils/helper";

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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4rem 0 4rem;
  width: 100%;
  height: calc(100% - 17rem);
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
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  height: 10rem;
`;

const StyleCTAButton = styled(Button)`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const styleTitleList = ["顏色主題", "字體樣式", "問卷背景"];
const defaultThemeList = helper.generateStyleKeys("NAME");
const defaultFontList = helper.generateStyleKeys("FONT");
const defaultBackgroundList = ["黃圓圓", "黃圓圓", "黃圓圓"];

interface SettingBarProps {
  setCurrentStep(number: number): void;
}

const SettingBar: FC<SettingBarProps> = ({
  setCurrentStep,
}: SettingBarProps) => {
  const [stylingOption, setStylingOption] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { setting, style, question } = useAppSelector((state) => state);

  const switchThemeHandler = (title: string) => {
    switch (title) {
      case styleConfig.MAIN_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.MAIN_CODE,
          })
        );
        break;
      }

      case styleConfig.YELLOW_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.YELLOW_CODE,
          })
        );
        break;
      }

      case styleConfig.GREEN_NAME: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.THEME,
            theme: styleConfig.GREEN_CODE,
          })
        );
        break;
      }

      case styleConfig.OPENHUNNINN_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.OPENHUNNINN_CODE,
          })
        );
        break;
      }

      case styleConfig.HANAMINA_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.HANAMINA_CODE,
          })
        );
        break;
      }

      case styleConfig.TAIPEISANSTCBOLD_FONT: {
        dispatch(
          styleActions.changeStyle({
            actionType: styleActionType.FONT,
            font: styleConfig.TAIPEISANSTCBOLD_CODE,
          })
        );
        break;
      }

      default: {
        throw "沒有這個類型的主題";
      }
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
              title={themeTitle}
              key={i}
              dispatchHandler={switchThemeHandler}
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
              dispatchHandler={switchThemeHandler}
            />
          ))}
        </CardContainer>
      )}
      {stylingOption === 2 && (
        <CardContainer>
          {defaultBackgroundList.map((Background, i) => (
            <Card title={Background} key={i} />
          ))}
        </CardContainer>
      )}
      <ButtonWrapper>
        <Button buttonType="button" clickHandler={() => setCurrentStep(4)}>
          點我發佈問卷
        </Button>
        <Button buttonType="button" clickHandler={() => setCurrentStep(2)}>
          返回題型設計
        </Button>
      </ButtonWrapper>
    </SettingLayout>
  );
};

export default SettingBar;
