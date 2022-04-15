import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { TextField } from "@mui/material";
import helper from "../../../../../utils/helper";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem;
  width: 30%;
  height: 6rem;
  border: 1px solid #aaa;
`;

const OptionItemText = styled.div`
  width: 70%;
  font-size: 1.8rem;
`;
const OptionDeleteButtonWrapper = styled.div`
  margin-right: 10%;
  width: 18%;
  height: 100%;
`;

const CustomDeleteIcon = styled(DeleteSharpIcon)`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  cursor: pointer;
`;

const CustomTextField = styled(TextField)`
  margin-right: 5%;
  width: 60%;
  height: 100%;

  & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
  }

  & input {
    font-size: inherit;
    width: 100%;
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

interface OptionItemProps {
  id: string;
  index: number;
  option: string;
  options: string[];
}

const OptionItem: FC<OptionItemProps> = ({
  id,
  index,
  option,
  options,
}: OptionItemProps) => {
  const [hasClickedOptionText, setHasClickedOptionText] =
    useState<boolean>(false);
  const [editingOptionText, setEditingOptionText] = useState<string>(option);
  const dispatch = useAppDispatch();

  const saveEditedTextHandler = () => {
    const checkNameUtilObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };
    const checkHasExistedTitle = helper.checkExistedName(checkNameUtilObj);

    if (checkHasExistedTitle) {
      window.alert("有重複的選項名稱存在，不可以重複儲存喲!");
      return;
    }

    const updateOptions = helper.generateUpdateNames(checkNameUtilObj);

    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
    setHasClickedOptionText(false);
  };

  return hasClickedOptionText ? (
    <OptionItemWrapper>
      <CustomTextField
        value={editingOptionText}
        placeholder=""
        label=""
        onChange={(event) => setEditingOptionText(event.target.value)}
      />
      <ButtonWrapper>
        <button
          style={{ marginBottom: "1rem" }}
          onClick={saveEditedTextHandler}
        >
          儲存
        </button>
        <button onClick={() => setHasClickedOptionText(false)}>取消</button>
      </ButtonWrapper>
    </OptionItemWrapper>
  ) : (
    <OptionItemWrapper>
      <OptionDeleteButtonWrapper>
        <CustomDeleteIcon />
      </OptionDeleteButtonWrapper>
      <OptionItemText onClick={() => setHasClickedOptionText(true)}>
        {option}
      </OptionItemText>
    </OptionItemWrapper>
  );
};

export default OptionItem;
