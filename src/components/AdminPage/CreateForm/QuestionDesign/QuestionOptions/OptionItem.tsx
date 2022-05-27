import { FC } from "react";

import { AddComment } from "@styled-icons/material-sharp/AddComment";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import questionDefaultConfig from "../../../../../configs/questionDefaultConfig";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import useCheckQuestionArraySameString from "../../../../../hooks/useCheckQuestionArraySameString";
import { questionActions } from "../../../../../store/slice/questionSlice";
import helper from "../../../../../utils/helper";
import sweetAlert from "../../../../../utils/sweetAlert";
import QuestionIcon from "../QuestionIcon";

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 90%;
  cursor: pointer;
`;

const OptionText = styled.div`
  font-size: 1.6rem;
  margin-right: 1rem;
  cursor: pointer;
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

const AddCommentSharpIconWrapper = styled(IconWrapper)`
  transform: translateY(2px);
  height: 2rem;
  cursor: pointer;

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
  cursor: pointer;

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

const CustomQuestionIcon = styled(QuestionIcon)`
  margin-right: 0.3rem;
  width: 1.8rem;
  height: 1.8rem;
  fill: #aaa;
  transform: translateY(-0.5rem);
  cursor: pointer;
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

const OptionItem: FC<OptionItemProps> = ({ title, questionType }: OptionItemProps) => {
  const dispatch = useAppDispatch();

  const { editingFormPage, isEditingOption, isEditingMatrix } = useAppSelector(
    (state) => state.question
  );
  const checkHasNoSameArrayStringNameHandler = useCheckQuestionArraySameString();

  const addNewQuestionHandler = (questionType: string) => {
    const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
    if (!hasNoSameStringName) return;

    if (isEditingOption || isEditingMatrix) {
      sweetAlert.errorReminderAlert("請先儲存編輯中的欄位或選項再新增題目！");
      return;
    }

    const id = helper.generateId(8);
    const defaultQuestion = questionDefaultList[+questionType];
    const newQuestion = {
      ...defaultQuestion,
      id,
      page: editingFormPage,
    };

    dispatch(questionActions.switchEditingField({ id, page: editingFormPage }));
    dispatch(questionActions.addNewQuestion(newQuestion));
  };
  return (
    <OptionWrapper onClick={() => addNewQuestionHandler(questionType)}>
      <Option>
        <OptionText>{title}</OptionText>
        <OptionTypeIconWrapper>
          <CustomQuestionIcon type={questionType} />
        </OptionTypeIconWrapper>
      </Option>
      <AddCommentSharpIconWrapper>
        <AddQuestionIcon />
      </AddCommentSharpIconWrapper>
    </OptionWrapper>
  );
};
export default OptionItem;
