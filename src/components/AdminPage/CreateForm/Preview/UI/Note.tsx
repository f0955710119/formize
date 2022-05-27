import { FC, useState } from "react";

import { TextField } from "@mui/material";
import styled from "styled-components";

import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useCheckQuestionArraySameString from "../../../../../hooks/useCheckQuestionArraySameString";
import questionActionType from "../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../store/slice/questionSlice";
import textUnderline from "../../../../UI/textUnderline";

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;

  & .MuiFilledInput-root {
    background-color: transparent;
    color: ${(props) => props.theme.note};

    &::before {
      border-bottom: 2px solid ${(props) => props.theme.note};
    }
  }

  & .MuiFilledInput-root.Mui-focused,
  & .MuiFilledInput-root.Mui-focused:hover {
    background-color: transparent;
  }

  & input {
    color: ${(props) => props.theme.note};
    width: 100%;
    font-size: 1.6rem;
    line-break: strict;
  }
`;
const NoteWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NoteText = styled.div`
  margin-bottom: 3rem;
  display: inline-block;
  font-size: 1.6rem;
  line-break: strict;
  cursor: text;
  color: ${(props) => props.theme.note};
  ${(props) => textUnderline(props.theme.note)}
`;

const EditingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  width: 15rem;
  height: 3rem;
  margin-top: 1rem;
  border-radius: 5px;
  color: #777;
  background-color: #ccc;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const EditingButtonText = styled.span`
  font-size: 1.2rem;
  color: inherit;
`;

interface NoteProps {
  id: string;
  note: string;
}

const Note: FC<NoteProps> = ({ id, note }: NoteProps) => {
  const dispatch = useAppDispatch();
  const [hasClickedNote, setHasClickedNote] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<string>(note);
  const checkHasNoSameArrayStringNameHandler = useCheckQuestionArraySameString();

  return hasClickedNote ? (
    <>
      <CustomTextField
        label=""
        variant="filled"
        value={editingNote}
        onChange={(event) => {
          setEditingNote(event.target.value);
        }}
      />

      <EditingButton
        onClick={() => {
          setHasClickedNote(false);
          const text = editingNote.trim().length !== 0 ? editingNote : " ";
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id,
              actionType: questionActionType.NOTE,
              text,
            })
          );
        }}
      >
        <EditingButtonText>完成編輯</EditingButtonText>
      </EditingButton>
      <EditingButton onClick={() => setHasClickedNote(false)}>
        <EditingButtonText>取消編輯</EditingButtonText>
      </EditingButton>
    </>
  ) : (
    <NoteWrapper>
      <NoteText
        onClick={() => {
          const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
          if (!hasNoSameStringName) return;
          setHasClickedNote(true);
        }}
      >
        {note.trim() === "" ? "點擊新增註解，若無則無需修改此行" : note}
      </NoteText>
    </NoteWrapper>
  );
};

export default Note;
