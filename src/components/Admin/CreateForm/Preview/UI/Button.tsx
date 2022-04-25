import styled from "styled-components";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.8rem;
  margin-bottom: 2rem;
  width: 16rem;
  height: 3.2rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.addOption};
  cursor: pointer;
`;

export const ButtonText = styled.div`
  margin-right: 1rem;
  font-size: 1.8rem;
  color: ${(props) => props.theme.title};
`;

// export const CustomButtonIcon = styled(AddCircleRoundedIcon)`
//   width: 1.8rem;
//   height: 80%;
//   fill: ${(props) => props.theme.title};
// `;
