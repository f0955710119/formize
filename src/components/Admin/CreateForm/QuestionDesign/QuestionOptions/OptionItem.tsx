import { FC, MouseEventHandler, ReactNode } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import styled from "styled-components";
import AddCommentSharpIcon from "@mui/icons-material/AddCommentSharp";
import questionConfig from "../../../../../utils/questionConfig";
import helper from "../../../../../utils/helper";

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
  questionConfig.ONE_LINE_TEXT_DEFAULT,
  questionConfig.MULTIPLE_LINE_TEXT_DEFAULT,
  questionConfig.INTRODUCTION_DEFAULT,
  questionConfig.SINGLE_CHOICE_DEFAULT,
  questionConfig.MULTIPLE_CHOICE_DEFAULT,
  questionConfig.MARTIX_DEFAULT,
  questionConfig.NUMBER_DEFAULT,
  questionConfig.SLIDER_DEFAULT,
  questionConfig.ORDER_DEFAULT,
  questionConfig.DATE_DEFAULT,
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
    dispatch(questionActions.addNewQuestion(newQuestion));
    switch (questionType) {
      case "0": {
        dispatch(questionActions.changeCurrentQuestionLimitation(0));
        break;
      }
      case "1": {
        dispatch(questionActions.changeCurrentQuestionLimitation(0));
        break;
      }
      case "2": {
        dispatch(questionActions.changeCurrentQuestionLimitation(99));
        break;
      }
      case "3": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
        break;
      }

      case "4": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
        break;
      }

      case "5": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
        break;
      }

      case "6": {
        dispatch(questionActions.changeCurrentQuestionLimitation(2));
        break;
      }

      case "7": {
        dispatch(questionActions.changeCurrentQuestionLimitation(2));
        break;
      }

      case "8": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
        break;
      }
      case "9": {
        dispatch(questionActions.changeCurrentQuestionLimitation(3));
        break;
      }
    }
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
