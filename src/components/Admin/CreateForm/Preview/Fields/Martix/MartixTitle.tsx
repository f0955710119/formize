import { FC } from "react";
import styled from "styled-components";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";

const MartixTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  margin-left: 1rem;
  border: 1px solid transparent;
`;

const MartixTitleText = styled.div`
  font-size: 1.4rem;
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
  return (
    <MartixTitleWrapper>
      <MartixTitleText>{martix}</MartixTitleText>
      <CustomBackspace onClick={deleteMartixTitleHandler} />
    </MartixTitleWrapper>
  );
};

export default MartixTitle;
