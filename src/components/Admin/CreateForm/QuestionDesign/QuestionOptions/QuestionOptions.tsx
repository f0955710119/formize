import { FC, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import styled from "styled-components";
import Layout from "../../UI/Layout";

import questionConfig from "../../../../../configs/questionConfig";
import { Question } from "../../../../../types/question";

import OptionItem from "./OptionItem";
import { Heading } from "../../UI/SectionHeading";
import TextLimitation from "./OptionLimitation/TextLimitation";
import ChoiceLimitation from "./OptionLimitation/ChoiceLimitation";
import NumberLimitation from "./OptionLimitation/NumberLimitation";
import DateLimitation from "./OptionLimitation/DateLimitation";
import QuestionIcon from "../QuestionIcon";

import NewPageModal from "../QuestionsList/NewPageModal";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import scrollBar from "../../../../UI/scrollBar";

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
    padding: 2rem 12rem 0 12rem;
    margin-bottom: 1rem;
  }

  @media ${breakpointConfig.tablet} {
    padding: 0 6rem 0 6rem;
  } ;
`;

const OptionHeading = styled(Heading)`
  margin-bottom: 2rem;
  color: #7a807c;
  border-bottom: 1px solid #7a807c;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 35vh;
  overflow-y: scroll;
  ${scrollBar}
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

  &:hover {
    background-color: #6e917bd6;
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

const questionList = Array(10)
  .fill(null)
  .map((_, i) => questionConfig[i]);

const generateLimitation = (question: Question) => {
  switch (question.type) {
    case "0": {
      return (
        <TextLimitation
          id={question.id}
          type={question.type}
          textType={question.validations.textType}
        />
      );
    }

    case "1": {
      return (
        <TextLimitation
          id={question.id}
          type={question.type}
          textType={question.validations.textType}
        />
      );
    }

    case "2": {
      return <></>;
    }

    case "3": {
      return <ChoiceLimitation id={question.id} type={question.type} />;
    }
    case "4": {
      return <ChoiceLimitation id={question.id} type={question.type} />;
    }
    case "5": {
      return <ChoiceLimitation id={question.id} type={question.type} />;
    }
    case "6": {
      return (
        <NumberLimitation id={question.id} validations={question.validations} />
      );
    }
    case "7": {
      return (
        <NumberLimitation id={question.id} validations={question.validations} />
      );
    }
    case "8": {
      return <ChoiceLimitation id={question.id} type={question.type} />;
    }
    case "9": {
      return <DateLimitation id={question.id} />;
    }
    default: {
      return <></>;
    }
  }
};
interface OptionItem {
  title: string;
  questionType: string;
  iconComponent: JSX.Element;
}

const QuestionOptions: FC = () => {
  const { editingQuestion, questions } = useAppSelector(
    (state) => state.question
  );
  const { mode } = useAppSelector((state) => state.setting);
  const switchStepHandler = useSwitchCurrentStep();
  const [hasOpenModal, setHasOpenModal] = useState<boolean>(false);

  return (
    <>
      {hasOpenModal && (
        <NewPageModal hasOpenModal={hasOpenModal} setModal={setHasOpenModal} />
      )}
      <OptionsLayout>
        <OptionHeading>題型</OptionHeading>
        <OptionList>
          {questionList.map((title, i) => (
            <OptionItem title={title} questionType={`${i}`} key={title}>
              <QuestionIcon
                questionType={`${i}`}
                style="transform: translateY(-0.6rem);"
              />
            </OptionItem>
          ))}
        </OptionList>
        <OptionHeading>限制</OptionHeading>
        {editingQuestion && generateLimitation(editingQuestion)}

        <OptionHeading>切換頁面</OptionHeading>
        {mode === "1" && (
          <AddPageButton
            type="button"
            onClick={() => {
              if (questions.length === 0) {
                alert(
                  "因為分頁型問卷不得有空白頁，請先新增至少一題才能加分頁唷!"
                );
                return;
              }
              setHasOpenModal(true);
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
    </>
  );
};

export default QuestionOptions;
