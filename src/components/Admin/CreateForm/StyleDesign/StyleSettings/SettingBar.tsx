// Card / Button ( router ) / O[tion hEADER] / able to scroll
import { FC, useState } from "react";
import styled from "styled-components";
import Layout from "../../UI/Layout";
import Card from "./UI/Card";
import HeaderItem from "./HeaderItem";
import Button from "../../UI/Button";

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
const defaultThemeList = ["1111", "1111", "1111"];
const defaultFontList = [
  "華康少女",
  "新細明體",
  "開源黑體",
  "華康少女",
  "新細明體",
  "開源黑體",
  "華康少女",
  "新細明體",
  "開源黑體",
  "華康少女",
  "新細明體",
  "開源黑體",
];
const defaultBackgroundList = ["黃圓圓", "黃圓圓", "黃圓圓"];

interface SettingBarProps {
  setCurrentStep(number: number): void;
}

const SettingBar: FC<SettingBarProps> = ({
  setCurrentStep,
}: SettingBarProps) => {
  const [stylingOption, setStylingOption] = useState<number>(0);
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
            <Card title={themeTitle} key={i} />
          ))}
        </CardContainer>
      )}
      {stylingOption === 1 && (
        <CardContainer>
          {defaultFontList.map((fontTitle, i) => (
            <Card title={fontTitle} key={i} />
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
