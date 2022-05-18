import { FC, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import Field from "../UI/Field";
import { TextareaAutosize } from "@mui/material";

const Heading = styled.div`
  width: 100%;
  font-size: 2rem;
  text-align: center;
  line-break: strict;
  cursor: text;
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const IntroductionField = styled(Field)`
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.note};
  color: ${(props) => props.theme.title};
  font-weight: bold;
  cursor: text;
`;

const CustomTextareaAutosize = styled(TextareaAutosize)`
  padding: 1rem;
  width: 100%;
  border: none;
  border-radius: 3px;
  font-size: 1.8rem;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
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
`;

interface IntroductionProps {
  id: string;
  title: string;
}

const Introduction: FC<IntroductionProps> = ({
  id,
  title,
}: IntroductionProps) => {
  const [hasClickIntroduction, setHasClickedIntroduction] =
    useState<boolean>(false);
  const [editingIntroduction, setEditingIntroduction] = useState<string>(title);
  const dispatch = useAppDispatch();

  const saveUpdateIntroductionHandler = () => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.TITLE,
        text: editingIntroduction,
      })
    );
    setHasClickedIntroduction(false);
  };

  return (
    <IntroductionField>
      {hasClickIntroduction ? (
        <>
          <CustomTextareaAutosize
            value={editingIntroduction}
            minRows={3}
            onChange={(event) => setEditingIntroduction(event.target.value)}
          />
          <Button onClick={saveUpdateIntroductionHandler}>儲存</Button>
          <Button onClick={() => setHasClickedIntroduction(false)}>取消</Button>
        </>
      ) : (
        <Heading onClick={() => setHasClickedIntroduction(true)}>
          {title}
        </Heading>
      )}
    </IntroductionField>
  );
};

export default Introduction;
