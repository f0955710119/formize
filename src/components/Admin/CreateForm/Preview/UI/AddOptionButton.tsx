import { FC } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";

import { ButtonWrapper, ButtonText, AddButtonIcon } from "./Button";

import { AddCircle } from "@styled-icons/remix-line/AddCircle";

const OptionButtonIcon = styled(AddCircle)``;
interface AddOptionButtonProps {
  id: string;
  options: string[];
}

const AddOptionButton: FC<AddOptionButtonProps> = ({
  id,
  options,
}: AddOptionButtonProps) => {
  const dispatch = useAppDispatch();

  const addNewOptionHandler = () => {
    const updateOptions = [...options, "預設選項"];

    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
  };

  return (
    <ButtonWrapper onClick={addNewOptionHandler}>
      <ButtonText>新增選項</ButtonText>
      <AddButtonIcon />
    </ButtonWrapper>
  );
};

export default AddOptionButton;
