import { FC } from "react";
import styled from "styled-components";
import useSwitchCurrentStep from "../../../hooks/useSwitchCurrentStep";

interface ItemWrapperProps {
  number: number;
  currentStep: number;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.currentStep === props.number ? "#f90" : "#333")};
  font-weight: ${(props) =>
    props.currentStep === props.number ? "bold" : "normal"};
  transition: color 0.3s;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NumberIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.2rem;
  border: 0.8px solid #c8c8c8;
  cursor: pointer;
`;
const NumberIcon = styled.span`
  font-size: 1.4rem;
`;

const TitleText = styled.span`
  font-size: 1.4rem;
  cursor: pointer;
`;
const IntervalLineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  width: 6rem;
  height: 100%;
`;

const IntervalLine = styled.span`
  width: 100%;
  height: 2px;
  background-color: #ccc;
`;

interface HeaderItemProps {
  number: number;
  title: string;
  isLastItem: boolean;
  currentStep: number;
}

const HeaderItem: FC<HeaderItemProps> = ({
  number,
  title,
  isLastItem,
  currentStep,
}: HeaderItemProps) => {
  const switchStepHandler = useSwitchCurrentStep();
  return (
    <ItemWrapper number={number} currentStep={currentStep}>
      <OptionWrapper onClick={() => switchStepHandler(number)}>
        <NumberIconWrapper>
          <NumberIcon>{number}</NumberIcon>
        </NumberIconWrapper>
        <TitleText>{title}</TitleText>
      </OptionWrapper>

      {!isLastItem && (
        <IntervalLineWrapper>
          <IntervalLine />
        </IntervalLineWrapper>
      )}
    </ItemWrapper>
  );
};

export default HeaderItem;
