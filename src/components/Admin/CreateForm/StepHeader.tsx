import { FC } from "react";
import styled from "styled-components";
import HeaderItem from "./HeaderItem";
import breakpointConfig from "../../../configs/breakpointConfig";

const defaultTitles = ["設定資訊", "題目設計", "外觀樣式", "發布問卷"];

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;

  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

interface StepHeaderProps {
  currentStep: number;
}

const StepHeader: FC<StepHeaderProps> = ({ currentStep }: StepHeaderProps) => {
  return (
    <Header>
      {defaultTitles.map((title, i) => (
        <HeaderItem
          key={i}
          number={i + 1}
          title={title}
          isLastItem={i === defaultTitles.length - 1}
          currentStep={currentStep}
        />
      ))}
    </Header>
  );
};

export default StepHeader;
