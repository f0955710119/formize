import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper, ButtonText } from "../../UI/Button";

const Button = styled(ButtonWrapper)`
  height: 2.4rem;
  background-color: ${(props) => props.theme.title};

  margin-bottom: 0;
  font-size: 1.4rem;
`;

const MartixButtonText = styled(ButtonText)`
  color: ${(props) => props.theme.addOption};
`;

interface AddMartixButtonProps {
  id: string;
  martixs: string[];
}

const AddMartixButton: FC<AddMartixButtonProps> = ({
  id,
  martixs,
}: AddMartixButtonProps) => {
  const dispatch = useAppDispatch();
  const addNewMartixHandler = () => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MARTIXS,
        stringArr: [...martixs, `選項${martixs.length + 1}`],
      })
    );
  };

  return (
    <Button onClick={addNewMartixHandler}>
      <MartixButtonText>新增欄位</MartixButtonText>
    </Button>
  );
};

export default AddMartixButton;
