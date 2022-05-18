import { FC } from "react";


import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useCheckEditingStateOfTextEditingField from "../../../../../hooks/useCheckEditingStateOfTextEditingField";
import questionActionType from "../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../store/slice/questionSlice";
import { ButtonWrapper, ButtonText, AddButtonIcon } from "./Button";

interface AddOptionButtonProps {
  id: string;
  options: string[];
}

const AddOptionButton: FC<AddOptionButtonProps> = ({
  id,
  options,
}: AddOptionButtonProps) => {
  const dispatch = useAppDispatch();
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();

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
    <ButtonWrapper
      onClick={() => {
        checkOpenEditingTextHandler(addNewOptionHandler, id);
      }}
    >
      <ButtonText>新增選項</ButtonText>
      <AddButtonIcon />
    </ButtonWrapper>
  );
};

export default AddOptionButton;
