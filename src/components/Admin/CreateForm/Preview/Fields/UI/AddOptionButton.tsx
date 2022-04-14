import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0.8rem;
  margin-bottom: 2rem;
  width: 16rem;
  height: 4rem;
  border-radius: 30px;
  background-color: #f90;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin-right: 1rem;
  font-size: 1.8rem;
  color: #fff;
`;

const CustomButtonIcon = styled(AddCircleRoundedIcon)`
  width: 1.8rem;
  height: 80%;
  fill: #fff;
`;

interface AddOptionButtonProps {
  id: string;
  options: string[];
}

const AddOptionButton: FC<AddOptionButtonProps> = ({
  id,
  options,
}: AddOptionButtonProps) => {
  const dispatch = useAppDispatch();
  const addNewOptionHandler = () => {
    const updateOptions = [...options, `選項${options.length + 1}`];
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.OPTIONS,
        stringArr: updateOptions,
      })
    );
  };

  return (
    <ButtonWrapper onClick={addNewOptionHandler}>
      <ButtonText>新增選項題目</ButtonText>
      <CustomButtonIcon />
    </ButtonWrapper>
  );
};

export default AddOptionButton;
