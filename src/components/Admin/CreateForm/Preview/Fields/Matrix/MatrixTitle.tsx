import { FC, useState } from "react";
import styled from "styled-components";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import helper from "../../../../../../utils/helper";

import breakpointConfig from "../../../../../../configs/breakpointConfig";

const MatrixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  /* margin-left: 1rem; */
  border: 1px solid transparent;

  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const MatrixTitleText = styled.div`
  font-size: 1.4rem;
  text-align: center;
  width: 4rem;
  word-wrap: break-word;
`;

const CustomBackspace = styled(BackspaceSharpIcon)`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;

  & div {
    width: 100%;
    height: 100%;
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
  const [editingMatrix, setEditingMatrix] = useState<string>(matrix);
  const dispatch = useAppDispatch();
  const deleteMatrixTitleHandler = () => {
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
    const newMatrixObj = {
      stringArr: matrixs,
      index,
      editingText: editingMatrix,
    };

    // const checkExistedmatrixTitle = helper.checkExistedName(newmatrixObj);
    // if (checkExistedmatrixTitle) {
    //   window.alert("不能存取重複的欄位名稱，請修改後再儲存!");
    //   return;
    // }
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
  // return hasClickedmatrix ? (
  //   <matrixTitleWrapper>
  //     <TextField
  //       label=""
  //       variant="standard"
  //       value={editingmatrix}
  //       onChange={(event) => setEditingmatrix(event.target.value)}
  //     />
  //     <button onClick={savematrixTitleHandler}>儲存</button>
  //     <button onClick={() => setHasClickedmatrix(false)}>取消</button>
  //   </matrixTitleWrapper>
  // ) : (
  //   <matrixTitleWrapper>
  //     <matrixTitleText onClick={() => setHasClickedmatrix(true)}>
  //       {matrix}
  //     </matrixTitleText>
  //     <CustomBackspace onClick={deletematrixTitleHandler} />
  //   </matrixTitleWrapper>
  // );
  return (
    <MatrixTitleWrapper>
      <MatrixTitleText onClick={() => setHasClickedMatrix(true)}>
        {matrix}
      </MatrixTitleText>
      <CustomBackspace onClick={deleteMatrixTitleHandler} />
    </MatrixTitleWrapper>
  );
};

export default MatrixTitle;
