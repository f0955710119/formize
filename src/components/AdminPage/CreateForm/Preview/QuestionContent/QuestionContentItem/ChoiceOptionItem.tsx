import { FC, useEffect, useRef, useState } from "react";

import { TextField } from "@mui/material";
import { Delete } from "@styled-icons/material/Delete";
import styled from "styled-components";

import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useCheckEditingStateOfTextEditingField from "../../../../../../hooks/useCheckEditingStateOfTextEditingField";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import helper from "../../../../../../utils/helper";
import sweetAlert from "../../../../../../utils/sweetAlert";
import useDeleteQuestionContentItem from "../../../../../../hooks/useDeleteQuestionContentItem";
import breakpointConfig from "../../../../../../configs/breakpointConfig";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const OptionItemText = styled.div`
  width: calc(100% - 3.4rem);
  font-size: 1.8rem;
  color: ${(props) => props.theme.title};
  margin-left: 1rem;
  cursor: text;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.note};
  }
`;

const EditingOptionItemWrapper = styled(OptionItemWrapper)`
  flex-direction: column;
  height: auto;
  padding: 1rem;
`;

const DeleteButton = styled(Delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: ${(props) => props.theme.optionText};
  margin-right: 1rem;
  cursor: pointer;

  transition: fill 0.3s;
  &:hover {
    fill: ${(props) => props.theme.note};
  }
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  height: 100%;

  & .MuiOutlinedInput-root {
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

  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
`;

interface OptionItemProps {
  id: string;
  index: number;
  options: string[];
}

const OptionItem: FC<OptionItemProps> = ({ id, index, options }: OptionItemProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId, isSwitchingEditingOption } = useAppSelector(
    (state) => state.question
  );

  const [editingOptionText, setEditingOptionText] = useState<string>(options[index]);
  const [hasClickedOptionText, setHasClickedOptionText] = useState<boolean>(false);
  const isLoading = useRef<boolean>(true);

  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();
  const deleteQuestionContentItemHandler = useDeleteQuestionContentItem("option");

  const saveEditedTextHandler = (editingOptionText: string) => {
    if (editingOptionText.trim().length === 0) {
      sweetAlert.errorReminderAlert("【儲存失敗】\n選項不能留空");
      return;
    }
    const checkNameUtilObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };
    const checkHasExistedTitle = helper.checkExistedName(checkNameUtilObj);

    if (checkHasExistedTitle) {
      sweetAlert.errorReminderAlert("【儲存失敗】\n有重複的選項名稱存在");
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
    dispatch(
      questionActions.setIsEditingOption({
        setEditingState: false,
        isReset: false,
      })
    );
  };

  const openEditingInputHandler = () => {
    setHasClickedOptionText(true);
    dispatch(
      questionActions.setIsEditingOption({
        setEditingState: true,
        isReset: false,
      })
    );
  };

  useEffect(() => {
    if (!isLoading.current) {
      if (editingQuestionId === null) return;

      if (editingQuestionId !== id) {
        setHasClickedOptionText(false);

        !isSwitchingEditingOption &&
          dispatch(
            questionActions.setIsEditingOption({
              setEditingState: false,
              isReset: true,
            })
          );
        dispatch(questionActions.setIsSwitchingEditingOption(false));
        return;
      }
      return;
    }
    isLoading.current = false;
  }, [editingQuestionId]);

  useEffect(() => {
    setEditingOptionText(options[index]);
  }, [options]);

  return hasClickedOptionText ? (
    <EditingOptionItemWrapper>
      <CustomTextField
        value={editingOptionText}
        placeholder=""
        label=""
        onChange={(event) => setEditingOptionText(event.target.value)}
      />

      <EditingButton onClick={() => saveEditedTextHandler(editingOptionText)}>
        儲存
      </EditingButton>
      <EditingButton
        onClick={() => {
          setHasClickedOptionText(false);
          dispatch(
            questionActions.setIsEditingOption({
              setEditingState: false,
              isReset: false,
            })
          );
        }}
      >
        取消
      </EditingButton>
    </EditingOptionItemWrapper>
  ) : (
    <OptionItemWrapper>
      <DeleteButton
        onClick={() => {
          deleteQuestionContentItemHandler(
            { id, index, willEditArray: options },
            questionActionType.OPTIONS
          );
        }}
      />

      <OptionItemText
        onClick={() => {
          checkOpenEditingTextHandler(openEditingInputHandler, id);
        }}
      >
        {options[index]}
      </OptionItemText>
    </OptionItemWrapper>
  );
};

export default OptionItem;
