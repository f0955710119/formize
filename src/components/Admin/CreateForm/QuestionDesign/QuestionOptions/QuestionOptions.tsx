import { FC, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import styled from "styled-components";
import Layout from "../../UI/Layout";

import questionConfig from "../../../../../configs/questionConfig";

import OptionItem from "./OptionItem";
import { Heading } from "../../UI/SectionHeading";

import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import scrollBar from "../../../../UI/scrollBar";
import sweetAlert from "../../../../../utils/sweetAlert";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import { settingActions } from "../../../../../store/slice/settingSlice";
import settingActinoType from "../../../../../store/actionType/settingActionType";

const OptionsLayout = styled(Layout)`
  width: 18%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    order: 3;
    height: 50vh;
    padding: 2rem 3rem 0 3rem;
    margin-bottom: 1rem;
  }

  @media ${breakpointConfig.tablet} {
    padding: 0 6rem 0 6rem;
  } ;
`;

const OptionHeading = styled(Heading)`
  margin-bottom: 2rem;
  color: #c9ab59;
  border-bottom: 1px solid #c9ab59;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 65vh;
  overflow-y: scroll;
  ${scrollBar}

  @media ${breakpointConfig.laptopM} {
    height: 25vh;
  }

  @media ${breakpointConfig.tabletS} {
    height: 26vh;
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  width: 100%;
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
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const AddPageButton = styled(ButtonWrapper)`
  background-color: #c8c8c8;
  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const NavigatorButton = styled(ButtonWrapper)`
  background-color: #c8c8c8;
`;

const customIconStyleString = `
  transform: translateY(-0.6rem);
`;

const questionList = Array(10)
  .fill(null)
  .map((_, i) => questionConfig[i]);

const questionListConfig: { [key: string]: string } = {};

questionList.forEach((question, i) => {
  questionListConfig[question] = question;
});

interface OptionItem {
  title: string;
  questionType: string;
  iconComponent: JSX.Element;
}

const QuestionOptions: FC = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.question);
  const { pageQuantity } = useAppSelector((state) => state.setting);
  const { mode } = useAppSelector((state) => state.setting);
  const switchStepHandler = useSwitchCurrentStep();

  const addNewFormPageHandler = (selectedNewQuestion: string) => {
    dispatch(
      questionActions.addNewFormPage({
        questionType: selectedNewQuestion,
        newPage: pageQuantity + 1,
      })
    );
    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActinoType.PAGE_QUANTITY,
        value: pageQuantity + 1,
      })
    );
  };

  return (
    <OptionsLayout>
      <OptionHeading>題型</OptionHeading>
      <OptionList>
        {questionList.map((title, i) => (
          <OptionItem title={title} questionType={`${i}`} key={title} />
        ))}
      </OptionList>

      <OptionHeading>切換頁面</OptionHeading>
      {mode === "1" && (
        <AddPageButton
          type="button"
          onClick={async () => {
            if (questions.length === 0) {
              sweetAlert.errorReminderAlert(
                "分頁模式不得有空白分頁，請先新增至少一題在第一頁唷！"
              );
              return;
            }
            const selectedNewQuestionType = await sweetAlert.selectInputAlert({
              title: "請選擇一種題型",
              text: "新增分頁前，需先選擇要加入該分頁的題型，\n像是很推薦用引言當開頭唷！",
              inputOptions: questionListConfig,
              inputPlaceholder: "點開選單",
            });
            const selectedQuestionTypeTitle = selectedNewQuestionType.value;
            const selectedQuestionType = Object.values(
              questionListConfig
            ).indexOf(selectedQuestionTypeTitle);

            if (selectedQuestionType === -1) return;

            addNewFormPageHandler(`${selectedQuestionType}`);
          }}
        >
          <ButtonText>新增分頁</ButtonText>
        </AddPageButton>
      )}

      <NavigatorButton
        type="button"
        onClick={() => {
          switchStepHandler(3);
        }}
      >
        <ButtonText>前往外觀樣式設計</ButtonText>
      </NavigatorButton>
      <ButtonWrapper
        type="button"
        onClick={() => {
          switchStepHandler(1);
        }}
      >
        <ButtonText>回到資訊設定</ButtonText>
      </ButtonWrapper>
    </OptionsLayout>
  );
};

export default QuestionOptions;
