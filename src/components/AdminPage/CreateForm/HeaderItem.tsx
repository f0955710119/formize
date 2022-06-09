import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckFormTitle from "../../../hooks/useCheckFormTitle";
import useDeployForm from "../../../hooks/useDeployForm";
import useSwitchCurrentStep from "../../../hooks/useSwitchCurrentStep";
import sweetAlert from "../../../utils/sweetAlert";

interface ItemWrapperProps {
  number: number;
  currentStep: number;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.currentStep === props.number ? "#e9b014" : "#333")};
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
}

const HeaderItem: FC<HeaderItemProps> = ({ number, title, isLastItem }: HeaderItemProps) => {
  const { currentStep } = useAppSelector((state) => state.question);
  const switchStepHandler = useSwitchCurrentStep();
  const sendFormDataCallback = useDeployForm();
  const checkFormTitleHandler = useCheckFormTitle();

  const clickToSwitchStepOfCreatingForm = async (step: number) => {
    if (currentStep === 4) {
      sweetAlert.errorReminderAlert("問卷已發佈，回不到修改階段了唷!");
      return;
    }

    const hasInvalidFormTitle = checkFormTitleHandler();
    if (hasInvalidFormTitle) return;

    if (step === 4) {
      await sendFormDataCallback();
      return;
    }

    switchStepHandler(number);
  };

  return (
    <ItemWrapper number={number} currentStep={currentStep}>
      <OptionWrapper onClick={async () => await clickToSwitchStepOfCreatingForm(number)}>
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
