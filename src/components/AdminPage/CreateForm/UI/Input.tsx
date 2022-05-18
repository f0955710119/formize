import styled from "styled-components";

const TextInput = styled.input`
  width: calc(100% - 12rem);
  height: 3rem;
  padding: 1.8rem 1rem;
  border-radius: 3px;
  border: 0.8px solid #c8c8c8;

  font-size: 1.5rem;

  &:focus {
    outline: none;
  }
`;

export default TextInput;
