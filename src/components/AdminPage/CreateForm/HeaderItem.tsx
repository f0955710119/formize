import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import useDeployForm from "../../../hooks/useDeployForm";
import useFormData from "../../../hooks/useFormData";
import useSwitchCurrentStep from "../../../hooks/useSwitchCurrentStep";
import { settingContext } from "../../../store/context/settingContext";
import sweetAlert from "../../../utils/sweetAlert";

interface ItemWrapperProps {
  number: number;
  currentStep: number;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.currentStep === props.number ? "#e9b014" : "#333"};
  font-weight: normal;
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
  border-radius: 3px;
  cursor: pointer;
`;
const NumberIcon = styled.span`
  font-size: 1.4rem;
`;

interface TitleTextProps {
  number: number;
  currentStep: number;
}

const TitleText = styled.span<TitleTextProps>`
  font-size: 1.6rem;
  cursor: pointer;

  @media ${breakpointConfig.laptopS} {
    display: ${(props: TitleTextProps) =>
      props.currentStep === props.number ? "inline-block" : "none"};
  }
`;

interface IntervalLineWrapperProps {
  number: number;
  currentStep: number;
}

const IntervalLineWrapper = styled.div<IntervalLineWrapperProps>`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  width: 8rem;
  height: 100%;

  @media ${breakpointConfig.laptopS} {
    display: ${(props: IntervalLineWrapperProps) =>
      props.currentStep === props.number ? "flex" : "none"};
    width: 2rem;
  }
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
  const settingContextData = useContext(settingContext);
  const switchStepHandler = useSwitchCurrentStep();
  const sendingFormData = useFormData();
  const sendFormDataHandler = useDeployForm();
  return (
    <ItemWrapper number={number} currentStep={currentStep}>
      <OptionWrapper
        onClick={async () => {
          if (settingContextData.title === "") {
            sweetAlert.errorReminderAlert("請一定要填寫問卷的標題！");
            return;
          }

          if (number === 4) {
            await sendFormDataHandler(sendingFormData);
            return;
          }
          switchStepHandler(number);
        }}
      >
        <NumberIconWrapper>
          <NumberIcon>{number}</NumberIcon>
        </NumberIconWrapper>
        <TitleText number={number} currentStep={currentStep}>
          {title}
        </TitleText>
      </OptionWrapper>

      {!isLastItem && (
        <IntervalLineWrapper number={number} currentStep={currentStep}>
          <IntervalLine />
        </IntervalLineWrapper>
      )}
    </ItemWrapper>
  );
};

export default HeaderItem;
