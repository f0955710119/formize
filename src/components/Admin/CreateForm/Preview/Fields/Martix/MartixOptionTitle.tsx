import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { TextField } from "@mui/material";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import helper from "../../../../../../utils/helper";

const MartixOptionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const MartixOptionTitleText = styled.span`
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

interface MartixOptionTitleProps {
  id: string;
  index: number;
  option: string;
  options: string[];
}

const MartixOptionTitle: FC<MartixOptionTitleProps> = ({
  id,
  index,
  option,
  options,
}: MartixOptionTitleProps) => {
  const [hasClickedOption, setHasClickOption] = useState<boolean>(false);
  const [editingOptionText, setEditingOptionText] = useState<string>(option);
  const dispatch = useAppDispatch();

  const deleteMartixOptionTitleHandler = () => {
    const updateOptions = options.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
  };

  const saveMartixOptionTitleHandler = () => {
    const newMartixObj = {
      stringArr: options,
      index,
      editingText: editingOptionText,
    };

    const checkExistedMartixTitle = helper.checkExistedName(newMartixObj);
    if (checkExistedMartixTitle) {
      window.alert("不能存取重複的選項名稱，請修改後再儲存!");
      return;
    }
    const updateMartixOptionTitle = helper.generateUpdateNames(newMartixObj);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateMartixOptionTitle,
      })
    );
    setHasClickOption(false);
  };

  return hasClickedOption ? (
    <MartixOptionTitleWrapper>
      <TextField
        label=""
        variant="standard"
        value={editingOptionText}
        onChange={(event) => setEditingOptionText(event.target.value)}
      />
      <button onClick={saveMartixOptionTitleHandler}>儲存</button>
      <button onClick={() => setHasClickOption(false)}>取消</button>
    </MartixOptionTitleWrapper>
  ) : (
    <MartixOptionTitleWrapper>
      <MartixOptionTitleText onClick={() => setHasClickOption(true)}>
        {option}
      </MartixOptionTitleText>
      <CustomBackspace onClick={deleteMartixOptionTitleHandler} />
    </MartixOptionTitleWrapper>
  );
};

export default MartixOptionTitle;
