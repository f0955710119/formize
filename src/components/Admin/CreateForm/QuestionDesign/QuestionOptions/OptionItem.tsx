import { FC, ReactNode } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import styled from "styled-components";

import { AddComment } from "@styled-icons/material-sharp/AddComment";
import QuestionIcon from "../QuestionIcon";

import helper from "../../../../../utils/helper";
import questionDefaultConfig from "../../../../../configs/questionDefaultConfig";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import useCheckQuestionArraySameString from "../../../../../hooks/useCheckQuestionArraySameString";
import breakpointConfig from "../../../../../configs/breakpointConfig";

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 90%;
`;

const OptionText = styled.div`
  font-size: 1.6rem;
  margin-right: 1rem;
`;

const IconWrapper = styled.div`
  height: 2rem;
  transform: translateY(4px);

  @media ${breakpointConfig.laptopM} {
    width: 10%;
  }
`;
const OptionTypeIconWrapper = styled(IconWrapper)`
  width: 2rem;
`;

// prettier-ignore
const AddCommentSharpIconWrapper = styled(IconWrapper)`
  transform: translateY(2px);
  height: 2rem;

  @media ${breakpointConfig.laptopM} {
    width: 10%;
    display: flex;
    justify-content: end;
  }
`;

const AddQuestionIcon = styled(AddComment)`
  width: 100%;
  height: 100%;
  fill: #c8c8c8;
  transform: translate(-0.6rem, -0.2rem);
  transition: fill 0.3s;

  @media ${breakpointConfig.laptopM} {
    width: auto;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.45rem 1rem;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  cursor: pointer;

  transition: background 0.3s, border 0.3s, border-radius 0.3s;

  &:hover {
    background: #fdd87238;
    border: 1px solid #fdd87238;
    border-radius: 0px;
  }

  &:hover svg {
    fill: #f90;
  }

  &:hover ${OptionText} {
    color: #f90;
  }

  @media ${breakpointConfig.laptopM} {
    &:hover {
      background: transparent;
      border: 1px solid #c8c8c8;
    }

    &:hover svg {
      fill: #c8c8c8;
    }

    &:hover ${OptionText} {
      color: #c8c8c8;
    }
  }
`;

const customIconStyleString = `
  transform: translateY(-0.5rem);
`;

const questionDefaultList = [
  questionDefaultConfig.ONE_LINE_TEXT_DEFAULT,
  questionDefaultConfig.MULTIPLE_LINE_TEXT_DEFAULT,
  questionDefaultConfig.INTRODUCTION_DEFAULT,
  questionDefaultConfig.ONE_CHOICE_DEFAULT,
  questionDefaultConfig.MULTIPLE_CHOICE_DEFAULT,
  questionDefaultConfig.MATRIX_DEFAULT,
  questionDefaultConfig.NUMBER_DEFAULT,
  questionDefaultConfig.SLIDER_DEFAULT,
  questionDefaultConfig.SORT_DEFAULT,
  questionDefaultConfig.DATE_DEFAULT,
];

interface OptionItemProps {
  title: string;
  questionType: string;
  dragStartHandler?: (event: DragEvent) => void;
}

const OptionItem: FC<OptionItemProps> = ({
  title,
  questionType,
}: OptionItemProps) => {
  const dispatch = useAppDispatch();

  const { editingFormPage } = useAppSelector((state) => state.question);
  const checkHasNoSameArrayStringNameHandler =
    useCheckQuestionArraySameString();

  const addNewQuestionHandler = (questionType: string) => {
    const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
    if (!hasNoSameStringName) return;

    const id = helper.generateId(8);
    const defaultQuestion = questionDefaultList[+questionType];
    const newQuestion = {
      ...defaultQuestion,
      id,
      page: editingFormPage,
    };
    dispatch(questionActions.willChangeLimitationValue(true));
    dispatch(questionActions.addNewQuestion(newQuestion));
    dispatch(questionActions.switchEditingQuestion(newQuestion));
  };
  return (
    <OptionWrapper onClick={() => addNewQuestionHandler(questionType)}>
      <Option>
        <OptionText>{title}</OptionText>
        <OptionTypeIconWrapper>
          <QuestionIcon type={questionType} style={customIconStyleString} />
        </OptionTypeIconWrapper>
      </Option>
      <AddCommentSharpIconWrapper>
        <AddQuestionIcon />
      </AddCommentSharpIconWrapper>
    </OptionWrapper>
  );
};
export default OptionItem;
