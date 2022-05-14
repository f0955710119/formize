import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper, ButtonText, AddButtonIcon } from "../../UI/Button";
import sweetAlert from "../../../../../../utils/sweetAlert";

const MatrixButton = styled(ButtonWrapper)`
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
    <MatrixButton onClick={addNewMatrixHandler}>
      <ButtonText>新增欄位</ButtonText>
      <AddButtonIcon />
    </MatrixButton>
  );
};

export default AddMatrixButton;
