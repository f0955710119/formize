import styled from "styled-components";

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
  font-size: 1.8rem;
  color: ${(props) => props.theme.title};
`;

