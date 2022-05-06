import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { TextField } from "@mui/material";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import helper from "../../../../../../utils/helper";

const MatrixOptionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
`;

const MatrixOptionTitleText = styled.span`
  font-size: 1.6rem;
  margin-right: 1rem;
`;

const CustomBackspace = styled(BackspaceSharpIcon)`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;

  & div {
    width: 100%;
    height: 100%;
  }
`;

interface MatrixOptionTitleProps {
  id: string;
  index: number;
  option: string;
  options: string[];
}

const MatrixOptionTitle: FC<MatrixOptionTitleProps> = ({
  id,
  index,
  option,
  options,
}: MatrixOptionTitleProps) => {
  const [hasClickedOption, setHasClickOption] = useState<boolean>(false);
  const [editingOptionText, setEditingOptionText] = useState<string>(option);
  const dispatch = useAppDispatch();

  const deleteMatrixOptionTitleHandler = () => {
    const updateOptions = options.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
  };

  const saveMatrixOptionTitleHandler = () => {
    const newmatrixObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };

    // const checkExistedmatrixTitle = helper.checkExistedName(newmatrixObj);
    // if (checkExistedmatrixTitle) {
    //  alert("不能存取重複的選項名稱，請修改後再儲存!");
    //   return;
    // }
    const updateMatrixOptionTitle = helper.generateUpdateNames(newmatrixObj);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateMatrixOptionTitle,
      })
    );
    setHasClickOption(false);
  };

  return hasClickedOption ? (
    <MatrixOptionTitleWrapper>
      <TextField
        label=""
        variant="standard"
        value={editingOptionText}
        onChange={(event) => setEditingOptionText(event.target.value)}
      />
      <button onClick={saveMatrixOptionTitleHandler}>儲存</button>
      <button onClick={() => setHasClickOption(false)}>取消</button>
    </MatrixOptionTitleWrapper>
  ) : (
    <MatrixOptionTitleWrapper>
      <MatrixOptionTitleText onClick={() => setHasClickOption(true)}>
        {option}
      </MatrixOptionTitleText>
      <CustomBackspace onClick={deleteMatrixOptionTitleHandler} />
    </MatrixOptionTitleWrapper>
  );
};

export default MatrixOptionTitle;
