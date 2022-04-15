import { FC } from "react";
import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 8rem;
  height: 4.6rem;
  background-color: #c8c8c8;
  border: 0.5px solid #aaa;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const DisplayButtonGroup: FC = () => {
  return (
    <ButtonGroup
      variant="contained"
      sx={{ boxShadow: "none", borderRadius: "0px", height: "4.7rem" }}
    >
      <ButtonWrapper>
        <ButtonText>列表</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonText>卡片</ButtonText>
      </ButtonWrapper>
    </ButtonGroup>
  );
};

export default DisplayButtonGroup;
