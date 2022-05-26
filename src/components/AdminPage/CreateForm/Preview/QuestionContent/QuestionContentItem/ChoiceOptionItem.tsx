import { FC } from "react";

import { TextField } from "@mui/material";
import { Delete } from "@styled-icons/material/Delete";
import styled from "styled-components";

import useDeleteQuestionContentItem from "../../../../../../hooks/useDeleteQuestionContentItem";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import useSaveQuestionContentText from "../../../../../../hooks/useSaveQuestionContentText";
import useEditingQuestionContent from "../../../../../../hooks/useEditingQuestionContent";
import Button from "../../../../../UI/Button";
import breakpointConfig from "../../../../../../configs/breakpointConfig";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
`;

const OptionItemText = styled.div`
  width: calc(100% - 3.4rem);
  font-size: 1.8rem;
  color: ${(props) => props.theme.title};
  margin-left: 1rem;
  cursor: text;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.note};
  }
`;

const EditingOptionItemWrapper = styled(OptionItemWrapper)`
  flex-direction: column;
  height: auto;
  padding: 1rem;
`;

const DeleteButton = styled(Delete)`
  width: 2.4rem;
  height: 2.4rem;
  fill: ${(props) => props.theme.optionText};
  margin-right: 1rem;
  cursor: pointer;

  transition: fill 0.3s;
  &:hover {
    fill: ${(props) => props.theme.note};
  }
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  height: 100%;

  & .MuiOutlinedInput-root {
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

const EditingButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  width: 15rem;
  height: 3rem;
  margin-top: 1rem;
  text-align: center;
  line-height: 3rem;
  border-radius: 5px;
  color: #777;
  background-color: #ccc;

  &:hover {
    color: #fff;
    background-color: #333;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
`;

interface OptionItemProps {
  id: string;
  index: number;
  option: string;
  options: string[];
}

const OptionItem: FC<OptionItemProps> = ({ id, index, option, options }: OptionItemProps) => {
  const {
    editingText,
    setEditingText,
    hasClickedText,
    toggleEditingInputHandler,
    clickTextHandler,
    saveContentCallback,
  } = useEditingQuestionContent({ stringCotent: option, contentType: "option" }, id);
  const deleteQuestionContentItemHandler = useDeleteQuestionContentItem("option");
  const saveOptionHandler = useSaveQuestionContentText();

  const saveEditngButtonProps = {
    text: "儲存",

    clickHandler: () => {
      saveOptionHandler(
        { stringArr: options, index, editingText },
        "選項",
        saveContentCallback
      );
    },
  };
  const closeEditingButtonProps = {
    text: "取消",
    clickHandler: () => {
      toggleEditingInputHandler(false);
    },
  };

  return hasClickedText ? (
    <EditingOptionItemWrapper>
      <CustomTextField
        value={editingText}
        placeholder=""
        label=""
        onChange={(event) => {
          setEditingText(event.target.value);
        }}
      />
      <EditingButton {...saveEditngButtonProps} />
      <EditingButton {...closeEditingButtonProps} />
    </EditingOptionItemWrapper>
  ) : (
    <OptionItemWrapper>
      <DeleteButton
        onClick={() => {
          deleteQuestionContentItemHandler(
            { id, index, willEditArray: options },
            questionActionType.OPTIONS
          );
        }}
      />
      <OptionItemText onClick={() => clickTextHandler(id)}>{option}</OptionItemText>
    </OptionItemWrapper>
  );
};

export default OptionItem;
