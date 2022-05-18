import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import HeaderItem from "./HeaderItem";


const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
  transform: translateX(-1.9rem);

  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const defaultTitles = ["設定資訊", "題目設計", "外觀樣式", "發佈問卷"];

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
