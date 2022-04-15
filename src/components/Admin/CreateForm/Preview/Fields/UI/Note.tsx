import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import styled from "styled-components";
import { TextField } from "@mui/material";
import questionActionType from "../../../../../../store/actionType/questionActionType";

const CustomTextField = styled(TextField)`
  width: 100%;
  & input {
    width: 100%;
    font-size: 1.6rem;
    line-break: strict;
  }
`;

const NoteText = styled.div`
  color: #aaa;
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

interface NoteProps {
  id: string;
  note: string;
}

const Note: FC<NoteProps> = ({ id, note }: NoteProps) => {
  const [hasClickedNote, setHasClickedNote] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<string>(note);

  const dispatch = useAppDispatch();
  return hasClickedNote ? (
    <>
      <CustomTextField
        label=""
        variant="standard"
        value={editingNote}
        onChange={(event) => setEditingNote(event.target.value)}
      />

      <button
        onClick={() => {
          setHasClickedNote(false);
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id,
              actionType: questionActionType.NOTE,
              text: editingNote,
            })
          );
        }}
      >
        完成編輯
      </button>
      <button onClick={() => setHasClickedNote(false)}>取消編輯</button>
    </>
  ) : (
    <NoteText onClick={() => setHasClickedNote(true)}>{note}</NoteText>
  );
};

export default Note;
