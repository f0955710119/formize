import { FC, useState } from "react";
import styled from "styled-components";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import helper from "../../../../../../utils/helper";

const MartixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  margin-left: 1rem;
  border: 1px solid transparent;
`;

const MartixTitleText = styled.div`
  font-size: 1.6rem;
  text-align: center;
  margin-right: 0.4rem;
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

interface MartixTitleProps {
  id: string;
  index: number;
  martix: string;
  martixs: string[];
}

const MartixTitle: FC<MartixTitleProps> = ({
  id,
  index,
  martix,
  martixs,
}: MartixTitleProps) => {
  const [hasClickedMartix, setHasClickedMartix] = useState<boolean>(false);
  const [editingMartix, setEditingMartix] = useState<string>(martix);
  const dispatch = useAppDispatch();
  const deleteMartixTitleHandler = () => {
    const updateMartix = martixs.filter((_, i) => i !== index);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MARTIXS,
        stringArr: updateMartix,
      })
    );
  };

  const saveMartixTitleHandler = () => {
    const newMartixObj = {
      stringArr: martixs,
      index,
      editingText: editingMartix,
    };

    const checkExistedMartixTitle = helper.checkExistedName(newMartixObj);
    if (checkExistedMartixTitle) {
      window.alert("不能存取重複的欄位名稱，請修改後再儲存!");
      return;
    }
    const updateMartixTitle = helper.generateUpdateNames(newMartixObj);
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MARTIXS,
        stringArr: updateMartixTitle,
      })
    );
    setHasClickedMartix(false);
  };
  return hasClickedMartix ? (
    <MartixTitleWrapper>
      <TextField
        label=""
        variant="standard"
        value={editingMartix}
        onChange={(event) => setEditingMartix(event.target.value)}
      />
      <button onClick={saveMartixTitleHandler}>儲存</button>
      <button onClick={() => setHasClickedMartix(false)}>取消</button>
    </MartixTitleWrapper>
  ) : (
    <MartixTitleWrapper>
      <MartixTitleText onClick={() => setHasClickedMartix(true)}>
        {martix}
      </MartixTitleText>
      <CustomBackspace onClick={deleteMartixTitleHandler} />
    </MartixTitleWrapper>
  );
};

export default MartixTitle;
