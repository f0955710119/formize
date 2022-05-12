import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { questionActions } from "../../../../../store/slice/questionSlice";
import sweetAlert from "../../../../../utils/sweetAlert";
import { AlertCircle } from "@styled-icons/ionicons-outline/AlertCircle";

const TitleInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  color: ${(props) => props.theme.title};
  transform: translateY(-2.8rem);

  & .MuiFilledInput-root {
    background-color: transparent;
    font-size: 2rem;
    color: ${(props) => props.theme.title};

    &::before {
      border-bottom: 2px solid ${(props) => props.theme.title};
    }
  }
  & .MuiFilledInput-input {
    width: 100%;
    line-break: strict;
  }
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
  transform: translateY(-2.8rem);

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const EditingButtonText = styled.span`
  font-size: 1.4rem;
  color: inherit;
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => props.theme.title};

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
        variant="filled"
        value={editingTitle}
        onChange={(event) => setEditingTitle(event.target.value)}
      />
      <EditingButton
        onClick={() => {
          if (editingTitle === "") {
            sweetAlert.errorReminderAlert("標題不能空白！");
            return;
          }
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
        <EditingButtonText>完成編輯</EditingButtonText>
      </EditingButton>
      <EditingButton onClick={() => setHasClickedTitle(false)}>
        <EditingButtonText>取消編輯</EditingButtonText>
      </EditingButton>
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
