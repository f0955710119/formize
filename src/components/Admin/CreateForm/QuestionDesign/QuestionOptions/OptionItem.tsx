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
    switch (questionType) {
      case "0": {
        const defaultOneLineText = { ...questionConfig.ONE_LINE_TEXT_DEFAULT };
        const newOneLineText = {
          ...defaultOneLineText,
          id,
          page,
        };
        dispatch(questionActions.addNewQuestion(newOneLineText));
        dispatch(questionActions.changeCurrentQuestionLimitation(0));
        break;
      }
      case "1": {
        const defaultMultiLineText = {
          ...questionConfig.MULTIPLE_LINE_TEXT_DEFAULT,
        };
        const newMultiLineText = {
          ...defaultMultiLineText,
          id,
          page,
        };
        dispatch(questionActions.addNewQuestion(newMultiLineText));
        dispatch(questionActions.changeCurrentQuestionLimitation(0));
        break;
      }
      case "2": {
        dispatch(questionActions.changeCurrentQuestionLimitation(99));
        break;
      }
      case "3": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
        // BUG: 為什麼不break還會持續跑?
        break;
      }

      case "4": {
        dispatch(questionActions.changeCurrentQuestionLimitation(1));
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
