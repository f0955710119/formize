import { FC, useState, useRef } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import styled from "styled-components";
import { TextField } from "@mui/material";
import questionActionType from "../../../../../store/actionType/questionActionType";

interface NoteProps {
  id: string;
  note: string;
  actionType: string;
}

const Note: FC<NoteProps> = ({ id, note, actionType }: NoteProps) => {
  const [isClicked, setIsClick] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<string>(note);
  const noteInputRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  return isClicked ? (
    <>
      <TextField
        label=""
        variant="standard"
        value={editingNote}
        ref={noteInputRef}
        onChange={(event) => setEditingNote(event.target.value)}
      />
      <button onClick={() => setIsClick(false)}>取消編輯</button>
      <button
        onClick={() => {
          setIsClick(false);
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id,
              actionType,
              text: editingNote,
            })
          );
        }}
      >
        完成編輯
      </button>
    </>
  ) : (
    <span onClick={() => setIsClick(true)}>{note}</span>
  );
};

export default Note;
