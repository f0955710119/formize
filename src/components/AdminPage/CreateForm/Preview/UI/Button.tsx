import { AddCircle } from "@styled-icons/remix-line/AddCircle";
import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.8rem;
  margin-bottom: 2rem;
  width: 14rem;
  height: 2.8rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.note};
  }
`;

export const ButtonText = styled.div`
  font-size: 1.6rem;
  color: #fff;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export const AddButtonIcon = styled(AddCircle)`
  width: 1.6rem;
  height: 1.6rem;
  fill: #fff;
  cursor: pointer;
`;
