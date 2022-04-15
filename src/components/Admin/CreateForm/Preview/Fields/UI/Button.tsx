import styled from "styled-components";
import AddCircleRoundedIcon from "@mui/icons-material/AddCirCleRounded";

export const ButtonWrapper = styled.div`
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

export const ButtonText = styled.div`
  margin-right: 1rem;
  font-size: 1.8rem;
  color: #fff;
`;

export const CustomButtonIcon = styled(AddCircleRoundedIcon)`
  width: 1.8rem;
  height: 80%;
  fill: #fff;
`;
