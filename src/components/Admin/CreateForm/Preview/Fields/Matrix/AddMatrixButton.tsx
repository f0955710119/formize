import { FC, useState, useRef } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper, ButtonText } from "../../UI/Button";
import Icons from "../../../QuestionDesign/QuestionIcon";

import sweetAlert from "../../../../../../utils/sweetAlert";

const Button = styled(ButtonWrapper)`
  height: 2.4rem;
  background-color: ${(props) => props.theme.title};

  margin-bottom: 0;
  font-size: 1.4rem;
`;

const MatrixButtonText = styled(ButtonText)`
  color: ${(props) => props.theme.addOption};
`;

const DeleteExistedMatrixButtonString = `
  width: 2rem;
  height: 2rem;
  fill: #aaa;
  margin-right: 0.5rem;
  cursor: pointer;
`;

interface AddMatrixButtonProps {
  id: string;
  matrixs: string[];
}

const AddMatrixButton: FC<AddMatrixButtonProps> = ({
  id,
  matrixs,
}: AddMatrixButtonProps) => {
  const [hasOpenModal, setHasOpenModal] = useState<boolean>(false);
  const [willUpdatedMatrixList, setWillUpdatedMatrixList] = useState<string[]>([
    ...matrixs,
  ]);
  const addNewMatrixInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const addNewMatrixHandler = () => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MATRIXS,
        stringArr: willUpdatedMatrixList,
      })
    );
  };

  const addWillUpdateMatrixHandler = () => {
    if (addNewMatrixInputRef.current === null) {
      sweetAlert.errorReminderAlert("不能新增空的欄位");
      return;
    }

    const value = addNewMatrixInputRef.current.value;
    if (value.length === 0) {
      sweetAlert.errorReminderAlert("不能新增空的欄位");
      return;
    }

    if (willUpdatedMatrixList.includes(value)) {
      sweetAlert.errorReminderAlert("不能新增重複名稱的欄位");
      return;
    }

    setWillUpdatedMatrixList((prevState) => {
      return [...prevState, value];
    });

    addNewMatrixInputRef.current.value = "";
  };

  return (
    <>
      <Button
        onClick={() => {
          setHasOpenModal(true);
          setWillUpdatedMatrixList(matrixs);
        }}
      >
        <MatrixButtonText>修改欄位</MatrixButtonText>
      </Button>
    </>
  );
};

export default AddMatrixButton;
