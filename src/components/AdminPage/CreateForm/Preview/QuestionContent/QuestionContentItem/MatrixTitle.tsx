import { FC } from "react";

import { TextField } from "@mui/material";
import { DeleteBack2 } from "@styled-icons/remix-fill/DeleteBack2";
import styled from "styled-components";

import breakpointConfig from "../../../../../../configs/breakpointConfig";
import useDeleteQuestionContentItem from "../../../../../../hooks/useDeleteQuestionContentItem";
import useEditingQuestionContent from "../../../../../../hooks/useEditingQuestionContent";
import useSaveQuestionContentText from "../../../../../../hooks/useSaveQuestionContentText";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import sweetAlert from "../../../../../../utils/sweetAlert";
import Button from "../../../../../UI/Button";
import textUnderline from "../../../../../UI/textUnderline";

const MatrixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border: 1px solid transparent;
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

const EditingButton = styled(Button)`
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

const MatrixTitle: FC<matrixTitleProps> = ({
  id,
  index,
  matrix,
  matrixs,
}: matrixTitleProps) => {
  const {
    editingText,
    setEditingText,
    hasClickedText,
    toggleEditingInputHandler,
    clickTextHandler,
    saveContentCallback,
  } = useEditingQuestionContent({ stringCotent: matrix, contentType: "matrix" }, id);
  const deleteQuestionContentItemHandler = useDeleteQuestionContentItem("matrix");
  const saveMatrixTitleHandler = useSaveQuestionContentText();

  const checkMatrixTitleValid = (value: string) => {
    if (value.length > 16) {
      sweetAlert.errorReminderAlert("【修改失敗】\n欄位的字數上限為16字");
      return;
    }
    setEditingText(value);
  };

  return hasClickedText ? (
    <EditingTextWrapper>
      <CustomTextField
        value={editingText}
        placeholder=""
        label=""
        onChange={(event) => {
          const { value } = event.target;
          checkMatrixTitleValid(value);
        }}
      />
      <EditingButtonWrapper>
        <EditingButton
          text="儲存"
          clickHandler={() =>
            saveMatrixTitleHandler(
              { stringArr: matrixs, index, editingText },
              "欄位",
              saveContentCallback
            )
          }
        />
        <EditingButton text="取消" clickHandler={() => toggleEditingInputHandler(false)} />
      </EditingButtonWrapper>
    </EditingTextWrapper>
  ) : (
    <MatrixTitleWrapper>
      <MatrixTitleText onClick={() => clickTextHandler(id)}>{matrix}</MatrixTitleText>
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
