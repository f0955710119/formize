import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { questionActions } from "../../../../../../store/slice/questionSlice";

const TitleInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  & input {
    width: 100%;
    font-size: 2rem;
    line-break: strict;
  }
`;

const Heading = styled.div`
  width: 100%;
  font-size: 2rem;
  line-break: strict;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

interface EditableTitleProps {
  id: string;
  title: string;
}

const EditableTitle: FC<EditableTitleProps> = ({
  id,
  title,
}: EditableTitleProps) => {
  const [hasClickedTitle, setHasClickedTitle] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>(title);
  const dispatch = useAppDispatch();
  return hasClickedTitle ? (
    <TitleInputWrapper>
      <CustomTextField
        label=""
        variant="standard"
        value={editingTitle}
        onChange={(event) => setEditingTitle(event.target.value)}
      />
      <button
        style={{ width: "8rem" }}
        onClick={() => {
          setHasClickedTitle(false);
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id,
              actionType: questionActionType.TITLE,
              text: editingTitle,
            })
          );
        }}
      >
        完成編輯
      </button>
      <button
        style={{ width: "8rem" }}
        onClick={() => setHasClickedTitle(false)}
      >
        取消編輯
      </button>
    </TitleInputWrapper>
  ) : (
    <Heading
      onClick={() => {
        setEditingTitle(title);
        setHasClickedTitle(true);
      }}
    >
      {title}
    </Heading>
  );
};

export default EditableTitle;
