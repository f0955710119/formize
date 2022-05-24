import { FC, useEffect, useRef, useState } from "react";

import { TextField } from "@mui/material";
import { DeleteBack2 } from "@styled-icons/remix-fill/DeleteBack2";
import styled from "styled-components";

import breakpointConfig from "../../../../../../configs/breakpointConfig";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import useCheckEditingStateOfTextEditingField from "../../../../../../hooks/useCheckEditingStateOfTextEditingField";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import helper from "../../../../../../utils/helper";
import sweetAlert from "../../../../../../utils/sweetAlert";
import textUnderline from "../../../../../UI/textUnderline";
import useDeleteQuestionContentItem from "../../../../../../hooks/useDeleteQuestionContentItem";

const MatrixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border: 1px solid transparent;

  @media ${breakpointConfig.tabletS} {
    /* display: none; */
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
    fill: ${(props) => props.theme.note};
  }
`;

const EditingTextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1rem 0;

  @media ${breakpointConfig.tabletS} {
    flex-direction: column;
  }
`;

const CustomTextField = styled(TextField)`
  width: 50%;
  height: 100%;

  & .MuiOutlinedInput-root {
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.optionText};
    margin-bottom: 0.5rem;
  }

  & input {
    font-size: inherit;
    width: 100%;
    height: 100%;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
`;

const EditingButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;

  @media ${breakpointConfig.tabletS} {
    width: 100%;
    margin-left: 0;
  }
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

  @media ${breakpointConfig.tabletS} {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;

interface matrixTitleProps {
  id: string;
  index: number;
  matrix: string;
  matrixs: string[];
}

const MatrixTitle: FC<matrixTitleProps> = ({ id, index, matrixs }: matrixTitleProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId } = useAppSelector((state) => state.question);
  const [hasClickedMatrix, setHasClickedMatrix] = useState<boolean>(false);
  const [editingMatrix, setEditingMatrix] = useState<string>(matrixs[index]);
  const isLoading = useRef<boolean>(false);
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();
  const deleteQuestionContentItemHandler = useDeleteQuestionContentItem("matrix");

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
      sweetAlert.errorReminderAlert("【儲存失敗】\n不能存取重複的欄位名稱");
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
    dispatch(
      questionActions.setIsEditingMatrix({
        setEditingState: false,
        isReset: false,
      })
    );
  };

  const openEditingInputHandler = () => {
    dispatch(
      questionActions.setIsEditingMatrix({
        setEditingState: true,
        isReset: false,
      })
    );
    setHasClickedMatrix(true);
  };

  useEffect(() => {
    if (!isLoading.current) {
      if (editingQuestionId === null) return;

      if (editingQuestionId !== id) {
        setHasClickedMatrix(false);
        dispatch(
          questionActions.setIsEditingMatrix({
            setEditingState: false,
            isReset: true,
          })
        );
        return;
      }
      return;
    }
    isLoading.current = false;
  }, [editingQuestionId]);

  useEffect(() => {
    setEditingMatrix(matrixs[index]);
  }, [matrixs]);

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
            dispatch(
              questionActions.setIsEditingMatrix({
                setEditingState: false,
                isReset: false,
              })
            );
          }}
        >
          取消
        </EditingButton>
      </EditingButtonWrapper>
    </EditingTextWrapper>
  ) : (
    <MatrixTitleWrapper>
      <MatrixTitleText
        onClick={() => {
          checkOpenEditingTextHandler(openEditingInputHandler, id);
        }}
      >
        {matrixs[index]}
      </MatrixTitleText>
      <MatrixTitleDeleteButton
        onClick={() =>
          deleteQuestionContentItemHandler(
            { id, index, willEditArray: matrixs },
            questionActionType.MATRIXS
          )
        }
      />
    </MatrixTitleWrapper>
  );
};

export default MatrixTitle;
