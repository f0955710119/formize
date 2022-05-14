import { FC, useState } from "react";
import styled from "styled-components";

import { DeleteBack2 } from "@styled-icons/remix-fill/DeleteBack2";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import helper from "../../../../../../utils/helper";

import breakpointConfig from "../../../../../../configs/breakpointConfig";
import { TextField } from "@mui/material";
import sweetAlert from "../../../../../../utils/sweetAlert";
import textUnderline from "../../../../../UI/textUnderline";

const MatrixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border: 1px solid transparent;

  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const MatrixTitleText = styled.div`
  display: inline-block;
  font-size: 1.9rem;
  text-align: center;
  word-wrap: break-word;
  margin-right: 1rem;
  transition: color 0.3s;

  ${(props) => textUnderline(props.theme.title)}

  &:hover {
    color: ${(props) => props.theme.note};
  }
`;

const MatrixTitleDeleteButton = styled(DeleteBack2)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(props) => props.theme.title};
  transition: fill 0.3s;
  &:hover {
    fill: #333;
  }
`;

const EditingTextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const CustomTextField = styled(TextField)`
  width: 50%;
  height: 100%;

  & [class*="-MuiInputBase-root-MuiOutlinedInput-root"] {
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

const EditingButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;

const EditingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2.4rem;
  text-align: center;
  line-height: 3rem;
  border-radius: 3px;
  color: #777;
  background-color: #ccc;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

interface matrixTitleProps {
  id: string;
  index: number;
  matrix: string;
  matrixs: string[];
}

const MatrixTitle: FC<matrixTitleProps> = ({
  id,
  index,
  matrix,
  matrixs,
}: matrixTitleProps) => {
  const [hasClickedMatrix, setHasClickedMatrix] = useState<boolean>(false);
  const [editingMatrix, setEditingMatrix] = useState<string>(matrixs[index]);
  const dispatch = useAppDispatch();
  const deleteMatrixTitleHandler = () => {
    if (matrixs.length < 3) {
      sweetAlert.errorReminderAlert("【 刪除失敗 】\n欄位數量不可以低於2個！");
      return;
    }

    const updateMatrix = matrixs.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MATRIXS,
        stringArr: updateMatrix,
      })
    );
  };

  const saveMatrixTitleHandler = () => {
    if (editingMatrix.trim().length === 0) {
      sweetAlert.errorReminderAlert("【儲存失敗】\n欄位不能留空");
      return;
    }

    const newMatrixObj = {
      stringArr: matrixs,
      index,
      editingText: editingMatrix,
    };

    const checkExistedmatrixTitle = helper.checkExistedName(newMatrixObj);
    if (checkExistedmatrixTitle) {
      sweetAlert.errorReminderAlert("不能存取重複的欄位名稱，請修改後再儲存!");
      return;
    }
    const updateMatrixTitle = helper.generateUpdateNames(newMatrixObj);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MATRIXS,
        stringArr: updateMatrixTitle,
      })
    );
    setHasClickedMatrix(false);
  };

  return hasClickedMatrix ? (
    <EditingTextWrapper>
      <CustomTextField
        value={editingMatrix}
        placeholder=""
        label=""
        onChange={(event) => {
          const { value } = event.target;

          if (value.length > 16) {
            sweetAlert.errorReminderAlert("【修改失敗】\n欄位的字數上限為16字");
            return;
          }
          setEditingMatrix(value);
        }}
      />
      <EditingButtonWrapper>
        <EditingButton onClick={saveMatrixTitleHandler}>儲存</EditingButton>
        <EditingButton
          onClick={() => {
            setHasClickedMatrix(false);
            dispatch(questionActions.setIsEditingOption(false));
          }}
        >
          取消
        </EditingButton>
      </EditingButtonWrapper>
    </EditingTextWrapper>
  ) : (
    <MatrixTitleWrapper>
      <MatrixTitleText onClick={() => setHasClickedMatrix(true)}>
        {matrixs[index]}
      </MatrixTitleText>
      <MatrixTitleDeleteButton onClick={deleteMatrixTitleHandler} />
    </MatrixTitleWrapper>
  );
};

export default MatrixTitle;
