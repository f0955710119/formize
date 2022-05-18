import { FC } from "react";

import styled from "styled-components";

import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useCheckEditingStateOfTextEditingField from "../../../../../../hooks/useCheckEditingStateOfTextEditingField";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import sweetAlert from "../../../../../../utils/sweetAlert";
import { ButtonWrapper, ButtonText, AddButtonIcon } from "../../UI/Button";

interface MatrixButtonProps {
  isEditingField: boolean;
}

const MatrixButton = styled(ButtonWrapper)<MatrixButtonProps>`
  margin-bottom: 0;
`;

interface AddMatrixButtonProps {
  id: string;
  matrixs: string[];
}

const AddMatrixButton: FC<AddMatrixButtonProps> = ({
  id,
  matrixs,
}: AddMatrixButtonProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestion } = useAppSelector((state) => state.question);
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();

  const hasEditingQuestion = editingQuestion !== null ? editingQuestion.id : "";
  const isEditingField = hasEditingQuestion === id;
  const addNewMatrixHandler = () => {
    if (matrixs.length > 4) {
      sweetAlert.errorReminderAlert(
        "【 新增失敗 】\n欄位數量目前最多只能5個！"
      );
      return;
    }
    const updateMatrixs = [...matrixs, "預設欄位"];
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MATRIXS,
        stringArr: updateMatrixs,
      })
    );
  };

  return (
    <MatrixButton
      isEditingField={isEditingField}
      onClick={() => {
        checkOpenEditingTextHandler(addNewMatrixHandler, id);
      }}
    >
      <ButtonText>新增欄位</ButtonText>
      <AddButtonIcon />
    </MatrixButton>
  );
};

export default AddMatrixButton;
