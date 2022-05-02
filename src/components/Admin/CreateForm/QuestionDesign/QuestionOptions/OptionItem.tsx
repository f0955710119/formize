import { FC, MouseEventHandler, ReactNode } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import styled from "styled-components";
import AddCommentSharpIcon from "@mui/icons-material/AddCommentSharp";

import helper from "../../../../../utils/helper";
import questionDefaultConfig from "../../../../../configs/questionDefaultConfig";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid #c8c8c8;
`;

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
`;
const OptionTypeIconWrapper = styled(IconWrapper)`
  width: 2rem;
`;

interface AddCommentSharpIconWrapper {
  readonly onClick: MouseEventHandler;
}

// prettier-ignore
const AddCommentSharpIconWrapper = styled(IconWrapper)<AddCommentSharpIconWrapper>`
  transform: translateY(2px);
  height: 2rem;
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
  children: ReactNode;
  dragStartHandler?: (event: DragEvent) => void;
}

const OptionItem: FC<OptionItemProps> = ({
  title,
  questionType,
  children,
}: OptionItemProps) => {
  const dispatch = useAppDispatch();
  const { editingFormPage } = useAppSelector((state) => state.question);
  const addNewQuestionHandler = (questionType: string) => {
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
    <OptionWrapper>
      <Option>
        <OptionText>{title}</OptionText>
        <OptionTypeIconWrapper>{children}</OptionTypeIconWrapper>
      </Option>
      <AddCommentSharpIconWrapper
        onClick={() => addNewQuestionHandler(questionType)}
      >
        <AddCommentSharpIcon
          sx={{
            width: "100%",
            height: "100%",
            fill: "#c8c8c8",
            cursor: "pointer",
          }}
        />
      </AddCommentSharpIconWrapper>
    </OptionWrapper>
  );
};
export default OptionItem;
