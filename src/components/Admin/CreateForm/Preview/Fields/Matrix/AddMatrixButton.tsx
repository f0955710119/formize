import { FC, useState, useRef } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper, ButtonText } from "../../UI/Button";
import icons from "../../../UI/icons";

import Modal from "../../../UI/Modal";

const Button = styled(ButtonWrapper)`
  height: 2.4rem;
  background-color: ${(props) => props.theme.title};

  margin-bottom: 0;
  font-size: 1.4rem;
`;

const MatrixButtonText = styled(ButtonText)`
  color: ${(props) => props.theme.addOption};
`;

const EditingMatrixList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EditingMatrixListTitle = styled.div`
  font-size: 1.6rem;
  color: #555;
  margin: 1rem 0;
`;

const EditingExistedMatrix = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  padding: 0.5rem 0;
  transform: translateX(-0.3rem);
`;

const DeleteExistedMatrixButton = styled(icons.delete)`
  width: 2rem;
  height: 2rem;
  fill: #aaa;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const AddMatrixWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AddMatrixInput = styled.input`
  padding: 0.4rem 1rem;
  width: calc(100% - 12rem);
  height: 4rem;
  font-size: 1.5rem;
  background-color: #eee;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  &::placeholder {
    color: #777;
  }
  &:focus {
    outline: none;
  }
`;

const AddNewMatrixButton = styled.button`
  width: 12rem;
  height: 4rem;
  font-size: 1.5rem;
  line-height: 4rem;
  text-align: center;
  background-color: #aaa;
  color: #333;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  &:hover {
    color: #fff;
    background-color: #333;
  }
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
      alert("不能新增空的欄位");
      return;
    }

    const value = addNewMatrixInputRef.current.value;
    if (value.length === 0) {
      alert("不能新增空的欄位");
      return;
    }
    setWillUpdatedMatrixList((prevState) => {
      return [...prevState, value];
    });

    addNewMatrixInputRef.current.value = "";
  };

  return (
    <>
      {hasOpenModal && (
        <Modal
          setModal={setHasOpenModal}
          hasOpenModal={hasOpenModal}
          undoButtonText="取消"
          submuitButtonText="修改"
          title="新增與編輯矩陣題欄位"
          cancelHandler={() => {
            setHasOpenModal(false);
            setWillUpdatedMatrixList(matrixs);
          }}
          submitHandler={() => {
            setHasOpenModal(false);
            addNewMatrixHandler();
          }}
        >
          <EditingMatrixList>
            <EditingMatrixListTitle>已存在的欄位名稱</EditingMatrixListTitle>
            {willUpdatedMatrixList.map((matrix, i) => (
              <EditingExistedMatrix key={i}>
                <DeleteExistedMatrixButton
                  onClick={() => {
                    const matrixList = [...willUpdatedMatrixList];
                    matrixList[i] = "";
                    const filteredmatrixList = matrixList.filter(
                      (matrix) => matrix !== ""
                    );
                    setWillUpdatedMatrixList(filteredmatrixList);
                  }}
                />
                {matrix}
              </EditingExistedMatrix>
            ))}
            <EditingMatrixListTitle style={{ marginTop: "2rem" }}>
              新增欄位名稱
            </EditingMatrixListTitle>
            <AddMatrixWrapper>
              <AddMatrixInput
                type="text"
                placeholder="在此輸入要新增的欄為名稱"
                ref={addNewMatrixInputRef}
              />
              <AddNewMatrixButton onClick={() => addWillUpdateMatrixHandler()}>
                新增
              </AddNewMatrixButton>
            </AddMatrixWrapper>
          </EditingMatrixList>
        </Modal>
      )}
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
