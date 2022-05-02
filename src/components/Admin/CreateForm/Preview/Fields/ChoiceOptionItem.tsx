import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { TextField } from "@mui/material";
import helper from "../../../../../utils/helper";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import icons from "../../UI/icons";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${breakpointConfig.laptopS} {
  }
`;

const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem;
  width: 100%;
  height: 6rem;
  border: 2px solid ${(props) => props.theme.optionText};

  /* @media ${breakpointConfig.laptopS} {
  } */
`;

const EditingOptionItemWrapper = styled(OptionItemWrapper)`
  flex-direction: column;
  height: auto;
  padding: 1rem;
`;

const OptionItemText = styled.div`
  width: 70%;
  font-size: 1.8rem;
  color: ${(props) => props.theme.optionText};
`;

const DeleteButton = styled(icons.delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: ${(props) => props.theme.optionText};
  margin-right: 1rem;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  height: 100%;

  & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
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

const EditingButton = styled.button`
  align-self: end;
  margin-top: 1rem;
  width: 50%;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1.4rem;
  color: #333;
  background-color: "#777";
  cursor: pointer;
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

  const deleteOptionHandler = (index: number) => {
    const updateOptinos = options.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptinos,
      })
    );
  };

  const saveEditedTextHandler = () => {
    const checkNameUtilObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };
    // const checkHasExistedTitle = helper.checkExistedName(checkNameUtilObj);

    // if (checkHasExistedTitle) {
    //   alert("有重複的選項名稱存在，不可以重複儲存喲!");
    //   return;
    // }

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
    <EditingOptionItemWrapper>
      <CustomTextField
        value={editingOptionText}
        placeholder=""
        label=""
        onChange={(event) => setEditingOptionText(event.target.value)}
      />

      <EditingButton
        style={{ marginBottom: "1rem" }}
        onClick={saveEditedTextHandler}
      >
        儲存
      </EditingButton>
      <EditingButton onClick={() => setHasClickedOptionText(false)}>
        取消
      </EditingButton>
    </EditingOptionItemWrapper>
  ) : (
    <OptionItemWrapper>
      <DeleteButton onClick={() => deleteOptionHandler(index)} />

      <OptionItemText
        onClick={() => {
          setHasClickedOptionText(true);
        }}
      >
        {option}
      </OptionItemText>
    </OptionItemWrapper>
  );
};

export default OptionItem;
