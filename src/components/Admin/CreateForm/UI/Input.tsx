import styled from "styled-components";

const TextInput = styled.input`
  width: calc(100% - 12rem);
  height: 3rem;
  padding: 1rem;
  border-radius: 0;
  border: 0.8px solid #c8c8c8;

  &:focus {
    outline: none;
  }
`;

export default TextInput;
