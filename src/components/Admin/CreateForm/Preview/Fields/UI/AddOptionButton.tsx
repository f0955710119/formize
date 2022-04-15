import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { ButtonWrapper, ButtonText, CustomButtonIcon } from "./Button";

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
    const updateOptions = [...options, `選項${options.length + 1}`];
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
      <ButtonText>新增選項題目</ButtonText>
      <CustomButtonIcon />
    </ButtonWrapper>
  );
};

export default AddOptionButton;
