import { FC, MouseEventHandler, ReactNode } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import styled from "styled-components";
import AddCommentSharpIcon from "@mui/icons-material/AddCommentSharp";
import questionConfig from "../../../../../configs/questionConfig";
import helper from "../../../../../utils/helper";
import questionDefaultConfig from "../../../../../configs/questionDefaultConfig";

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
  questionDefaultConfig.MARTIX_DEFAULT,
  questionDefaultConfig.NUMBER_DEFAULT,
  questionDefaultConfig.SLIDER_DEFAULT,
  questionDefaultConfig.SORT_DEFAULT,
  questionDefaultConfig.DATE_DEFAULT,
];

interface OptionItemProps {
  title: string;
  page: number;
  questionType: string;
  children: ReactNode;
  dragStartHandler?: (event: DragEvent) => void;
}

const OptionItem: FC<OptionItemProps> = ({
  title,
  page,
  questionType,
  children,
}: OptionItemProps) => {
  const dispatch = useAppDispatch();
  const addNewQuestionHandler = (questionType: string, page: number) => {
    const id = helper.generateId(8);
    // BUG: 為什麼不break還會持續跑?
    const defaultQuestion = questionDefaultList[+questionType];
    const newQuestion = {
      ...defaultQuestion,
      id,
      page,
    };
    dispatch(questionActions.willChangeLimitationValue(true));
    dispatch(questionActions.addNewQuestion(newQuestion));
    // BUG: 重複的題型新增時，切換題目的限制沒有改變
    dispatch(questionActions.switchEditingQuestion(newQuestion));
  };
  return (
    <OptionWrapper draggable>
      <Option>
        <OptionText>{title}</OptionText>
        <OptionTypeIconWrapper>{children}</OptionTypeIconWrapper>
      </Option>
      <AddCommentSharpIconWrapper
        onClick={() => addNewQuestionHandler(questionType, page)}
      >
        <AddCommentSharpIcon
          sx={{ width: "100%", height: "100%", fill: "#c8c8c8" }}
        />
      </AddCommentSharpIconWrapper>
    </OptionWrapper>
  );
};
export default OptionItem;
