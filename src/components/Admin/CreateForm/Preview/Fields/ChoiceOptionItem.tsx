import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";

import { TextField } from "@mui/material";
import helper from "../../../../../utils/helper";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import Icons from "../../QuestionDesign/QuestionIcon";
import { Delete } from "@styled-icons/material/Delete";
import sweetAlert from "../../../../../utils/sweetAlert";
import useCheckQuestionArraySameString from "../../../../../hooks/useCheckQuestionArraySameString";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import useGetQuestionTitleIndex from "../../../../../hooks/useGetQuestionTitleIndex";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${breakpointConfig.laptopS} {
  }
`;

const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem;
  width: 100%;
  height: 6rem;
  border: 2px solid ${(props) => props.theme.optionText};
`;

const EditingOptionItemWrapper = styled(OptionItemWrapper)`
  flex-direction: column;
  height: auto;
  padding: 1rem;
`;

const OptionItemText = styled.div`
  width: 70%;
  font-size: 1.8rem;
  color: ${(props) => props.theme.optionText};
  margin-left: 1rem;
`;

const DeleteButton = styled(Delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: ${(props) => props.theme.optionText};
  margin-right: 1rem;
  cursor: pointer;

  transition: fill 0.3s;

  &:hover {
    fill: #333;
  }
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  height: 100%;

  & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.optionText};
  }

  & input {
    font-size: inherit;
    width: 100%;
    height: 100%;
  }
`;

const EditingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  width: 15rem;
  height: 3rem;
  margin-top: 1rem;
  text-align: center;
  line-height: 3rem;
  border-radius: 5px;
  color: #777;
  background-color: #ccc;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

interface OptionItemProps {
  id: string;
  index: number;
  option: string;
  options: string[];
}

const OptionItem: FC<OptionItemProps> = ({
  id,
  index,
  option,
  options,
}: OptionItemProps) => {
  const dispatch = useAppDispatch();
  const {
    editingQuestion,
    isEditingOption,
    isSwitchingEditingOption,
    questions,
  } = useAppSelector((state) => state.question);

  const [hasClickedOptionText, setHasClickedOptionText] =
    useState<boolean>(false);
  const [editingOptionText, setEditingOptionText] = useState<string>(option);
  const isLoading = useRef<boolean>(true);
  const checkHasNoSameArrayStringNameHandler =
    useCheckQuestionArraySameString();

  const getTitleIndexHandler = useGetQuestionTitleIndex();

  const deleteOptionHandler = (index: number) => {
    if (isEditingOption && editingQuestion?.id === id) {
      sweetAlert.errorReminderAlert(
        "請先完成所有正在編輯的選項，\n才能進行刪除的動作"
      );
      return;
    }
    const updateOptinos = options.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptinos,
      })
    );
  };

  const saveEditedTextHandler = () => {
    const checkNameUtilObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };
    const checkHasExistedTitle = helper.checkExistedName(checkNameUtilObj);

    if (checkHasExistedTitle) {
      sweetAlert.errorReminderAlert("有重複的選項名稱存在，不可以重複儲存喲!");
      return;
    }

    const updateOptions = helper.generateUpdateNames(checkNameUtilObj);

    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
    setHasClickedOptionText(false);
    dispatch(questionActions.setIsEditingOption(false));
  };

  useEffect(() => {
    if (!isLoading.current) {
      if (editingQuestion === null) return;

      if (editingQuestion.id !== id) {
        setHasClickedOptionText(false);

        !isSwitchingEditingOption &&
          dispatch(questionActions.setIsEditingOption(false));
        dispatch(questionActions.setIsSwitchingEditingOption(false));
        return;
      }
      return;
    }
    isLoading.current = false;
  }, [editingQuestion]);

  console.log(isEditingOption);

  return hasClickedOptionText ? (
    <EditingOptionItemWrapper>
      <CustomTextField
        value={editingOptionText}
        placeholder=""
        label=""
        onChange={(event) => setEditingOptionText(event.target.value)}
      />

      <EditingButton onClick={saveEditedTextHandler}>儲存</EditingButton>
      <EditingButton
        onClick={() => {
          setHasClickedOptionText(false);
          dispatch(questionActions.setIsEditingOption(false));
        }}
      >
        取消
      </EditingButton>
    </EditingOptionItemWrapper>
  ) : (
    <OptionItemWrapper>
      <DeleteButton
        onClick={() => {
          if (options.length < 3) {
            sweetAlert.errorReminderAlert(
              "至少要維持兩個選項唷，\n所以當前不能再刪除！"
            );
            return;
          }
          deleteOptionHandler(index);
        }}
      />

      <OptionItemText
        onClick={() => {
          const openEditingInputHandler = () => {
            setHasClickedOptionText(true);
            dispatch(questionActions.setIsEditingOption(true));
          };
          if (editingQuestion !== null && editingQuestion.id !== id) {
            const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
            if (!hasNoSameStringName) return;
          }

          if (
            isEditingOption &&
            editingQuestion !== null &&
            editingQuestion.id !== id
          ) {
            const questionTitleIndex = getTitleIndexHandler(editingQuestion.id);
            const question = questions.find((question) => question.id === id);

            sweetAlert.clickToConfirmAlert(
              {
                title: "準備切換編輯題目",
                text: `發現「${questionTitleIndex}.${
                  question ? question.title : ""
                }」\n還有正在編輯的「選項」，\n直接切換編輯題目將不會存儲，\n確定要直接切換嗎?`,
                cancelButtonText: "取消",
                confirmButtonText: "確定",
              },
              openEditingInputHandler
            );
            return;
          }

          openEditingInputHandler();
        }}
      >
        {option}
      </OptionItemText>
    </OptionItemWrapper>
  );
};

export default OptionItem;
